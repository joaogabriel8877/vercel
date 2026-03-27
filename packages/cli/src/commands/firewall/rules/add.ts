import chalk from 'chalk';
import type Client from '../../../util/client';
import output from '../../../output-manager';
import { rulesAddSubcommand } from '../command';
import {
  parseSubcommandArgs,
  ensureProjectLink,
  confirmAction,
  detectExistingDraft,
  offerAutoPublish,
  withGlobalFlags,
} from '../shared';
import patchFirewallDraft from '../../../util/firewall/patch-firewall-draft';
import { parseConditionFlags } from '../../../util/firewall/parse-conditions';
import {
  VALID_ACTIONS,
  VALID_DURATIONS,
  VALID_ALGORITHMS,
  type FirewallActionType,
} from '../../../util/firewall/condition-types';
import { formatRuleExpanded } from '../../../util/firewall/format';
import type {
  FirewallRule,
  FirewallRuleAction,
} from '../../../util/firewall/types';
import stamp from '../../../util/output/stamp';
import { outputAgentError } from '../../../util/agent-output';
import { getCommandName } from '../../../util/pkg-name';

export default async function add(client: Client, argv: string[]) {
  const parsed = await parseSubcommandArgs(
    argv,
    rulesAddSubcommand,
    client,
    'rules add'
  );
  if (typeof parsed === 'number') return parsed;

  const aiPrompt = parsed.flags['--ai'] as string | undefined;
  const jsonInput = parsed.flags['--json'] as string | undefined;
  const conditionFlags = parsed.flags['--condition'] as string[] | undefined;

  // Mutual exclusivity check
  const modeCount = [aiPrompt, jsonInput, conditionFlags].filter(
    Boolean
  ).length;
  if (modeCount > 1) {
    output.error(
      'Cannot use --ai, --json, and --condition together. Use only one mode.'
    );
    return 1;
  }

  // Mode dispatch
  if (aiPrompt) {
    // AI mode
    const { handleAIAdd } = await import('./add-ai');
    const link = await ensureProjectLink(client);
    if (typeof link === 'number') return link;
    const { project, org } = link;
    const teamId = org.type === 'team' ? org.id : undefined;
    return handleAIAdd(client, project, teamId, {
      prompt: aiPrompt,
      name: parsed.args[0],
      skipPrompts: !!parsed.flags['--yes'],
    });
  }

  if (jsonInput) {
    // JSON mode
    return handleJsonAdd(client, parsed, jsonInput);
  }

  if (conditionFlags) {
    // Flag mode — pass original argv for --or group reconstruction
    return handleFlagAdd(client, parsed, argv);
  }

  // No mode specified — interactive or error
  if (client.stdin.isTTY && !client.nonInteractive) {
    // Interactive mode: offer AI vs manual choice
    const mode = await client.input.select({
      message: 'How would you like to create the rule?',
      choices: [
        {
          value: 'ai',
          name: 'Describe what you want (AI-powered)',
        },
        {
          value: 'manual',
          name: 'Build manually (step by step)',
        },
        {
          value: 'json',
          name: 'Paste JSON',
        },
      ],
    });

    const link = await ensureProjectLink(client);
    if (typeof link === 'number') return link;
    const { project, org } = link;
    const teamId = org.type === 'team' ? org.id : undefined;

    if (mode === 'ai') {
      const { handleAIAdd } = await import('./add-ai');
      return handleAIAdd(client, project, teamId, {
        skipPrompts: false,
      });
    }

    if (mode === 'json') {
      const jsonStr = await client.input.text({
        message: 'Paste the JSON rule definition:',
      });
      return handleJsonAdd(client, parsed, jsonStr);
    }

    // Manual interactive mode
    const { addInteractive } = await import('./add-interactive');
    return addInteractive(client, project, teamId, {
      skipPrompts: !!parsed.flags['--yes'],
    });
  }

  // Non-interactive with no flags — error with guidance
  outputAgentError(client, {
    status: 'error',
    reason: 'missing_flags',
    message:
      'No rule definition provided. Use --ai, --json, or --condition flags.',
    next: [
      {
        command: withGlobalFlags(
          client,
          'firewall rules add --ai "Block bots from Russia" --yes'
        ),
        when: 'to create with AI',
      },
      {
        command: withGlobalFlags(
          client,
          'firewall rules add --condition "user_agent:sub:crawler" --action deny --yes'
        ),
        when: 'to create with flags',
      },
    ],
  });
  process.exit(1);
  return 1;
}

// --- JSON mode ---

async function handleJsonAdd(
  client: Client,
  parsed: { args: string[]; flags: Record<string, unknown> },
  jsonStr: string
): Promise<number> {
  let ruleData: Record<string, unknown>;
  try {
    ruleData = JSON.parse(jsonStr);
  } catch {
    output.error('Invalid JSON. Please provide a valid JSON object.');
    return 1;
  }

  // Validate required fields
  if (!ruleData.name || typeof ruleData.name !== 'string') {
    output.error('JSON must include a "name" field (string).');
    return 1;
  }
  if (!ruleData.conditionGroup || !Array.isArray(ruleData.conditionGroup)) {
    output.error('JSON must include a "conditionGroup" field (array).');
    return 1;
  }
  if (!ruleData.action || typeof ruleData.action !== 'object') {
    output.error('JSON must include an "action" field (object).');
    return 1;
  }

  // Validate limits
  if ((ruleData.name as string).length > 160) {
    output.error('Rule name must be 160 characters or less.');
    return 1;
  }
  if (ruleData.description !== undefined && ruleData.description !== null) {
    if (typeof ruleData.description !== 'string') {
      output.error('JSON "description" field must be a string.');
      return 1;
    }
    if (ruleData.description.length > 256) {
      output.error('Rule description must be 256 characters or less.');
      return 1;
    }
  }
  if ((ruleData.conditionGroup as unknown[]).length > 25) {
    output.error('Maximum 25 condition groups allowed.');
    return 1;
  }

  const rule = {
    name: ruleData.name,
    description: ruleData.description,
    active: ruleData.active !== false,
    conditionGroup: ruleData.conditionGroup,
    action: ruleData.action,
  };

  return createRule(
    client,
    parsed,
    rule as unknown as Omit<FirewallRule, 'id'>
  );
}

// --- Flag mode ---

/**
 * Extract --condition values and --or markers from raw argv in order.
 * Returns an interleaved array where condition values alternate with '--or' markers.
 * This preserves the grouping intent that the standard arg parser loses.
 */
function extractConditionFlags(argv: string[]): string[] {
  const result: string[] = [];
  let i = 0;
  while (i < argv.length) {
    if (argv[i] === '--or') {
      result.push('--or');
      i++;
    } else if (argv[i] === '--condition' && i + 1 < argv.length) {
      result.push(argv[i + 1]);
      i += 2;
    } else if (argv[i].startsWith('--condition=')) {
      result.push(argv[i].slice('--condition='.length));
      i++;
    } else {
      i++; // skip non-condition flags (--action, --yes, name, etc.)
    }
  }
  return result;
}

async function handleFlagAdd(
  client: Client,
  parsed: { args: string[]; flags: Record<string, unknown> },
  rawArgv: string[]
): Promise<number> {
  // Parse name
  const name = parsed.args[0] as string | undefined;
  if (!name) {
    output.error(
      `Missing rule name. Provide as the first argument: ${chalk.cyan(getCommandName('firewall rules add "Rule name" --condition ...'))}`
    );
    return 1;
  }
  if (name.length > 160) {
    output.error('Rule name must be 160 characters or less.');
    return 1;
  }

  // Parse conditions with --or group support
  // Scan the raw argv to preserve the interleaved ordering of --condition and --or flags
  const interleaved = extractConditionFlags(rawArgv);
  if (interleaved.length === 0) {
    output.error('At least one --condition is required.');
    return 1;
  }

  const condResult = parseConditionFlags(interleaved);
  if (typeof condResult === 'string') {
    output.error(condResult);
    return 1;
  }
  const conditionGroups = condResult.groups;

  if (conditionGroups.length > 25) {
    output.error('Maximum 25 condition groups allowed.');
    return 1;
  }

  // Parse action
  const actionType = parsed.flags['--action'] as string | undefined;
  if (!actionType) {
    output.error(
      `Missing --action. Valid actions: ${VALID_ACTIONS.join(', ')}`
    );
    return 1;
  }
  if (!VALID_ACTIONS.includes(actionType as FirewallActionType)) {
    output.error(
      `Invalid action "${actionType}". Valid actions: ${VALID_ACTIONS.join(', ')}`
    );
    return 1;
  }

  // Build action object
  const action = buildActionFromFlags(parsed.flags, actionType);
  if (typeof action === 'string') {
    output.error(action);
    return 1;
  }

  const description = parsed.flags['--description'] as string | undefined;
  if (description && description.length > 256) {
    output.error('Rule description must be 256 characters or less.');
    return 1;
  }

  const active = !parsed.flags['--inactive'];

  const rule = {
    name,
    description,
    active,
    conditionGroup: conditionGroups,
    action,
  };

  return createRule(client, parsed, rule);
}

function buildActionFromFlags(
  flags: Record<string, unknown>,
  actionType: string
): FirewallRuleAction | string {
  const duration = flags['--duration'] as string | undefined;

  if (
    duration &&
    !VALID_DURATIONS.includes(duration as (typeof VALID_DURATIONS)[number])
  ) {
    return `Invalid duration "${duration}". Valid durations: ${VALID_DURATIONS.join(', ')}`;
  }

  const action: FirewallRuleAction = {
    mitigate: {
      action: actionType,
      rateLimit: null,
      redirect: null,
      actionDuration: duration || null,
    },
  };

  if (actionType === 'rate_limit') {
    const algo = (flags['--rate-limit-algo'] as string) || 'fixed_window';
    const window = flags['--rate-limit-window'] as number | undefined;
    const requests = flags['--rate-limit-requests'] as number | undefined;
    const keys = (flags['--rate-limit-keys'] as string[]) || ['ip'];

    if (!VALID_ALGORITHMS.includes(algo as (typeof VALID_ALGORITHMS)[number])) {
      return `Invalid rate limit algorithm "${algo}". Valid: ${VALID_ALGORITHMS.join(', ')}`;
    }
    if (!window || window < 10) {
      return 'Rate limit --rate-limit-window is required (minimum 10 seconds).';
    }
    if (window > 3600) {
      return 'Rate limit --rate-limit-window maximum is 3600 seconds (1 hour).';
    }
    if (!requests || requests < 1) {
      return 'Rate limit --rate-limit-requests is required (minimum 1).';
    }
    if (requests > 10_000_000) {
      return 'Rate limit --rate-limit-requests maximum is 10,000,000.';
    }

    action.mitigate!.rateLimit = {
      algo: algo as 'fixed_window' | 'token_bucket',
      window,
      limit: requests,
      keys,
    };
  }

  if (actionType === 'redirect') {
    const redirectUrl = flags['--redirect-url'] as string | undefined;
    const permanent = !!flags['--permanent'];

    if (!redirectUrl) {
      return 'Redirect action requires --redirect-url.';
    }
    if (
      !redirectUrl.startsWith('/') &&
      !redirectUrl.startsWith('http://') &&
      !redirectUrl.startsWith('https://')
    ) {
      return 'Redirect URL must start with /, http://, or https://';
    }

    action.mitigate!.redirect = {
      location: redirectUrl,
      permanent,
    };
  }

  return action;
}

// --- Shared create logic ---

async function createRule(
  client: Client,
  parsed: { args: string[]; flags: Record<string, unknown> },
  rule: Omit<FirewallRule, 'id'>
): Promise<number> {
  const link = await ensureProjectLink(client);
  if (typeof link === 'number') return link;

  const { project, org } = link;
  const teamId = org.type === 'team' ? org.id : undefined;

  // Show preview and confirm
  const previewRule = { ...rule, id: '(new)' } as FirewallRule;
  output.print(`\n${formatRuleExpanded(previewRule)}\n\n`);

  const confirmed = await confirmAction(
    client,
    parsed.flags['--yes'] as boolean,
    `Create this rule?`
  );

  if (!confirmed) {
    output.log('Canceled');
    return 0;
  }

  const createStamp = stamp();
  output.spinner('Staging rule');

  try {
    const hadExistingDraft = await detectExistingDraft(
      client,
      project.id,
      teamId
    );

    await patchFirewallDraft(
      client,
      project.id,
      {
        action: 'rules.insert',
        id: null,
        value: rule,
      },
      { teamId }
    );

    output.log(
      `${chalk.cyan('Success!')} Rule "${chalk.bold(rule.name)}" staged ${chalk.gray(createStamp())}`
    );

    await offerAutoPublish(client, project.id, hadExistingDraft, {
      teamId,
      skipPrompts: parsed.flags['--yes'] as boolean,
    });

    return 0;
  } catch (e: unknown) {
    const error = e as { message?: string };
    const msg = error.message || 'Failed to stage rule';
    if (client.nonInteractive) {
      outputAgentError(client, {
        status: 'error',
        reason: 'api_error',
        message: msg,
        next: [
          {
            command: withGlobalFlags(client, 'firewall rules add --yes'),
          },
        ],
      });
      process.exit(1);
      return 1;
    }
    output.error(msg);
    return 1;
  }
}
