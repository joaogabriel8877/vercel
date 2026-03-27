import { packageName } from '../../util/pkg-name';
import { yesOption } from '../../util/arg-common';

export const statusSubcommand = {
  name: 'status',
  aliases: [],
  description: 'Show firewall status and configuration overview',
  arguments: [],
  options: [
    {
      name: 'json',
      shorthand: null,
      type: Boolean,
      deprecated: false,
      description: 'Output as JSON',
    },
  ],
  examples: [
    {
      name: 'Show firewall status',
      value: `${packageName} firewall status`,
    },
  ],
} as const;

export const diffSubcommand = {
  name: 'diff',
  aliases: [],
  description: 'Show pending draft changes',
  arguments: [],
  options: [
    {
      name: 'json',
      shorthand: null,
      type: Boolean,
      deprecated: false,
      description: 'Output as JSON',
    },
  ],
  examples: [
    {
      name: 'Show pending changes',
      value: `${packageName} firewall diff`,
    },
  ],
} as const;

export const publishSubcommand = {
  name: 'publish',
  aliases: [],
  description: 'Publish draft changes to production',
  arguments: [],
  options: [yesOption],
  examples: [
    {
      name: 'Publish draft changes',
      value: `${packageName} firewall publish`,
    },
    {
      name: 'Publish without confirmation',
      value: `${packageName} firewall publish --yes`,
    },
  ],
} as const;

export const discardSubcommand = {
  name: 'discard',
  aliases: [],
  description: 'Discard all draft changes',
  arguments: [],
  options: [yesOption],
  examples: [
    {
      name: 'Discard draft changes',
      value: `${packageName} firewall discard`,
    },
    {
      name: 'Discard without confirmation',
      value: `${packageName} firewall discard --yes`,
    },
  ],
} as const;

// System Bypass subcommands
export const systemBypassListSubcommand = {
  name: 'list',
  aliases: ['ls'],
  description: 'List system bypass rules',
  arguments: [],
  options: [
    {
      name: 'json',
      shorthand: null,
      type: Boolean,
      deprecated: false,
      description: 'Output as JSON',
    },
  ],
  examples: [
    {
      name: 'List bypass rules',
      value: `${packageName} firewall system-bypass list`,
    },
  ],
} as const;

export const systemBypassAddSubcommand = {
  name: 'add',
  aliases: [],
  description: 'Add a system bypass rule for an IP address',
  arguments: [{ name: 'ip', required: true }],
  options: [
    {
      name: 'domain',
      shorthand: null,
      type: String,
      deprecated: false,
      description: 'Scope bypass to a specific domain (default: all domains)',
    },
    {
      name: 'notes',
      shorthand: null,
      type: String,
      deprecated: false,
      description: 'Add a note to the bypass rule',
    },
    yesOption,
  ],
  examples: [
    {
      name: 'Add a bypass for an IP (all domains)',
      value: `${packageName} firewall system-bypass add 10.0.0.1`,
    },
    {
      name: 'Add a bypass scoped to a domain',
      value: `${packageName} firewall system-bypass add 10.0.0.1 --domain example.com`,
    },
  ],
} as const;

export const systemBypassRemoveSubcommand = {
  name: 'remove',
  aliases: ['rm'],
  description: 'Remove a system bypass rule',
  arguments: [{ name: 'ip', required: true }],
  options: [
    {
      name: 'domain',
      shorthand: null,
      type: String,
      deprecated: false,
      description: 'Scope removal to a specific domain',
    },
    yesOption,
  ],
  examples: [
    {
      name: 'Remove a bypass rule',
      value: `${packageName} firewall system-bypass remove 10.0.0.1`,
    },
  ],
} as const;

export const systemBypassSubcommand = {
  name: 'system-bypass',
  aliases: [],
  description: 'Manage system bypass rules',
  arguments: [],
  subcommands: [
    systemBypassListSubcommand,
    systemBypassAddSubcommand,
    systemBypassRemoveSubcommand,
  ],
  options: [],
  examples: [
    {
      name: 'List bypass rules',
      value: `${packageName} firewall system-bypass list`,
    },
    {
      name: 'Add a bypass for an IP',
      value: `${packageName} firewall system-bypass add 10.0.0.1`,
    },
    {
      name: 'Remove a bypass',
      value: `${packageName} firewall system-bypass remove 10.0.0.1`,
    },
  ],
} as const;

// Attack Mode subcommands
export const attackModeOnSubcommand = {
  name: 'on',
  aliases: [],
  description: 'Enable attack mode (challenge all requests)',
  arguments: [],
  options: [
    {
      name: 'duration',
      shorthand: null,
      type: String,
      deprecated: false,
      description: 'Duration: 1h, 6h, or 24h (default: 1h)',
    },
    yesOption,
  ],
  examples: [
    {
      name: 'Enable attack mode for 1 hour',
      value: `${packageName} firewall attack-mode on`,
    },
    {
      name: 'Enable attack mode for 24 hours',
      value: `${packageName} firewall attack-mode on --duration 24h`,
    },
  ],
} as const;

export const attackModeOffSubcommand = {
  name: 'off',
  aliases: [],
  description: 'Disable attack mode',
  arguments: [],
  options: [yesOption],
  examples: [
    {
      name: 'Disable attack mode',
      value: `${packageName} firewall attack-mode off`,
    },
  ],
} as const;

export const attackModeSubcommand = {
  name: 'attack-mode',
  aliases: [],
  description: 'Manage attack mode (challenge all incoming requests)',
  arguments: [],
  subcommands: [attackModeOnSubcommand, attackModeOffSubcommand],
  options: [],
  examples: [
    {
      name: 'Enable attack mode',
      value: `${packageName} firewall attack-mode on`,
    },
    {
      name: 'Disable attack mode',
      value: `${packageName} firewall attack-mode off`,
    },
  ],
} as const;

// System Mitigations subcommands
export const systemMitigationsPauseSubcommand = {
  name: 'pause',
  aliases: [],
  description: 'Pause system mitigations for 24 hours',
  arguments: [],
  options: [yesOption],
  examples: [
    {
      name: 'Pause system mitigations',
      value: `${packageName} firewall system-mitigations pause --yes`,
    },
  ],
} as const;

export const systemMitigationsResumeSubcommand = {
  name: 'resume',
  aliases: [],
  description: 'Resume system mitigations',
  arguments: [],
  options: [yesOption],
  examples: [
    {
      name: 'Resume system mitigations',
      value: `${packageName} firewall system-mitigations resume`,
    },
  ],
} as const;

export const systemMitigationsSubcommand = {
  name: 'system-mitigations',
  aliases: [],
  description: 'Manage automatic system mitigations',
  arguments: [],
  subcommands: [
    systemMitigationsPauseSubcommand,
    systemMitigationsResumeSubcommand,
  ],
  options: [],
  examples: [
    {
      name: 'Pause system mitigations',
      value: `${packageName} firewall system-mitigations pause`,
    },
  ],
} as const;

// IP Blocks subcommands
export const ipBlocksListSubcommand = {
  name: 'list',
  aliases: ['ls'],
  description: 'List IP blocking rules (shows draft state if a draft exists)',
  arguments: [],
  options: [
    {
      name: 'json',
      shorthand: null,
      type: Boolean,
      deprecated: false,
      description: 'Output as JSON',
    },
  ],
  examples: [
    {
      name: 'List IP blocking rules',
      value: `${packageName} firewall ip-blocks list`,
    },
  ],
} as const;

export const ipBlocksBlockSubcommand = {
  name: 'block',
  aliases: [],
  description: 'Block an IP address or CIDR range',
  arguments: [{ name: 'ip', required: true }],
  options: [
    {
      name: 'hostname',
      shorthand: null,
      type: String,
      deprecated: false,
      description: 'Scope block to a specific hostname (default: all hosts)',
    },
    {
      name: 'action',
      shorthand: null,
      type: String,
      deprecated: false,
      description: 'Action: deny, challenge, log, or bypass (default: deny)',
    },
    {
      name: 'notes',
      shorthand: null,
      type: String,
      deprecated: false,
      description: 'Add a note to the block rule',
    },
    yesOption,
  ],
  examples: [
    {
      name: 'Block an IP',
      value: `${packageName} firewall ip-blocks block 1.2.3.4`,
    },
    {
      name: 'Block a CIDR range with a note',
      value: `${packageName} firewall ip-blocks block 10.0.0.0/24 --notes "Suspicious range"`,
    },
    {
      name: 'Block with challenge action',
      value: `${packageName} firewall ip-blocks block 5.6.7.8 --action challenge`,
    },
  ],
} as const;

export const ipBlocksUnblockSubcommand = {
  name: 'unblock',
  aliases: ['rm'],
  description: 'Remove an IP blocking rule',
  arguments: [{ name: 'id-or-ip', required: true }],
  options: [yesOption],
  examples: [
    {
      name: 'Unblock by IP',
      value: `${packageName} firewall ip-blocks unblock 1.2.3.4`,
    },
    {
      name: 'Unblock by rule ID',
      value: `${packageName} firewall ip-blocks unblock ip_abc123`,
    },
  ],
} as const;

export const ipBlocksSubcommand = {
  name: 'ip-blocks',
  aliases: [],
  description: 'Manage IP blocking rules',
  arguments: [],
  subcommands: [
    ipBlocksListSubcommand,
    ipBlocksBlockSubcommand,
    ipBlocksUnblockSubcommand,
  ],
  options: [],
  examples: [
    {
      name: 'List IP blocking rules',
      value: `${packageName} firewall ip-blocks list`,
    },
    {
      name: 'Block an IP',
      value: `${packageName} firewall ip-blocks block 1.2.3.4`,
    },
    {
      name: 'Unblock an IP',
      value: `${packageName} firewall ip-blocks unblock 1.2.3.4`,
    },
  ],
} as const;

// Rules subcommands
export const rulesListSubcommand = {
  name: 'list',
  aliases: ['ls'],
  description: 'List custom firewall rules',
  arguments: [],
  options: [
    {
      name: 'expand',
      shorthand: 'e',
      type: Boolean,
      deprecated: false,
      description: 'Show full condition details for each rule',
    },
    {
      name: 'json',
      shorthand: null,
      type: Boolean,
      deprecated: false,
      description: 'Output as JSON',
    },
  ],
  examples: [
    {
      name: 'List rules',
      value: `${packageName} firewall rules list`,
    },
    {
      name: 'List rules with full condition details',
      value: `${packageName} firewall rules list --expand`,
    },
  ],
} as const;

export const rulesInspectSubcommand = {
  name: 'inspect',
  aliases: [],
  description: 'Show full details of a custom firewall rule',
  arguments: [{ name: 'name-or-id', required: true }],
  options: [
    {
      name: 'json',
      shorthand: null,
      type: Boolean,
      deprecated: false,
      description: 'Output as JSON',
    },
  ],
  examples: [
    {
      name: 'Inspect a rule by name',
      value: `${packageName} firewall rules inspect "Block bots"`,
    },
    {
      name: 'Inspect a rule by ID',
      value: `${packageName} firewall rules inspect rule_abc123`,
    },
  ],
} as const;

export const rulesAddSubcommand = {
  name: 'add',
  aliases: [],
  description: 'Create a new custom firewall rule',
  arguments: [{ name: 'name', required: false }],
  options: [
    {
      name: 'ai',
      shorthand: null,
      type: String,
      deprecated: false,
      description: 'Generate rule from natural language (AI-powered)',
    },
    {
      name: 'json',
      shorthand: null,
      type: String,
      deprecated: false,
      description: 'Create rule from JSON payload',
    },
    {
      name: 'condition',
      shorthand: null,
      type: [String] as unknown as StringConstructor,
      deprecated: false,
      description: 'Condition: type:op:value or type:key:op:value (repeatable)',
    },
    {
      name: 'or',
      shorthand: null,
      type: Boolean,
      deprecated: false,
      description: 'Start a new OR condition group',
    },
    {
      name: 'action',
      shorthand: null,
      type: String,
      deprecated: false,
      description: 'Action: deny, challenge, log, bypass, rate_limit, redirect',
    },
    {
      name: 'duration',
      shorthand: null,
      type: String,
      deprecated: false,
      description: 'Action duration: 1m, 5m, 15m, 30m, 1h',
    },
    {
      name: 'description',
      shorthand: null,
      type: String,
      deprecated: false,
      description: 'Rule description (max 256 chars)',
    },
    {
      name: 'inactive',
      shorthand: null,
      type: Boolean,
      deprecated: false,
      description: 'Create as inactive (default: active)',
    },
    {
      name: 'algo',
      shorthand: null,
      type: String,
      deprecated: false,
      description: 'Rate limit algorithm: fixed_window, token_bucket',
    },
    {
      name: 'window',
      shorthand: null,
      type: Number,
      deprecated: false,
      description: 'Rate limit window in seconds',
    },
    {
      name: 'limit',
      shorthand: null,
      type: Number,
      deprecated: false,
      description: 'Rate limit max requests per window',
    },
    {
      name: 'keys',
      shorthand: null,
      type: [String] as unknown as StringConstructor,
      deprecated: false,
      description: 'Rate limit keys (repeatable): ip, ja4, header:name',
    },
    {
      name: 'redirect-url',
      shorthand: null,
      type: String,
      deprecated: false,
      description: 'Redirect URL or path',
    },
    {
      name: 'permanent',
      shorthand: null,
      type: Boolean,
      deprecated: false,
      description: 'Permanent redirect (301 vs 307)',
    },
    yesOption,
  ],
  examples: [
    {
      name: 'Interactive mode',
      value: `${packageName} firewall rules add`,
    },
    {
      name: 'Create with AI',
      value: `${packageName} firewall rules add --ai "Block bots from Russia"`,
    },
    {
      name: 'Create from JSON',
      value: `${packageName} firewall rules add --json '{"name":"Block bots","active":true,"conditionGroup":[{"conditions":[{"type":"user_agent","op":"sub","value":"crawler"}]}],"action":{"mitigate":{"action":"deny"}}}'`,
    },
    {
      name: 'Create with flags (single AND group)',
      value: `${packageName} firewall rules add "Block bots" --condition "user_agent:sub:crawler" --action deny --yes`,
    },
    {
      name: 'Create with OR groups',
      value: `${packageName} firewall rules add "Block suspicious" --condition "user_agent:sub:crawler" --or --condition "ip_address:eq:1.2.3.4" --action deny --yes`,
    },
  ],
} as const;

export const rulesSubcommand = {
  name: 'rules',
  aliases: [],
  description: 'Manage custom firewall rules',
  arguments: [],
  subcommands: [
    rulesListSubcommand,
    rulesInspectSubcommand,
    rulesAddSubcommand,
  ],
  options: [],
  examples: [
    {
      name: 'List rules',
      value: `${packageName} firewall rules list`,
    },
    {
      name: 'Inspect a rule',
      value: `${packageName} firewall rules inspect "Block bots"`,
    },
    {
      name: 'Create with AI',
      value: `${packageName} firewall rules add --ai "Block bots from Russia"`,
    },
  ],
} as const;

export const firewallCommand = {
  name: 'firewall',
  aliases: [],
  description: 'Manage your project firewall configuration',
  hidden: true as const,
  arguments: [],
  subcommands: [
    statusSubcommand,
    rulesSubcommand,
    ipBlocksSubcommand,
    diffSubcommand,
    publishSubcommand,
    discardSubcommand,
    systemBypassSubcommand,
    attackModeSubcommand,
    systemMitigationsSubcommand,
  ],
  options: [],
  examples: [
    {
      name: 'Show firewall status',
      value: `${packageName} firewall status`,
    },
    {
      name: 'List custom rules',
      value: `${packageName} firewall rules list`,
    },
    {
      name: 'Show pending changes',
      value: `${packageName} firewall diff`,
    },
    {
      name: 'Block an IP address',
      value: `${packageName} firewall ip-blocks block 1.2.3.4`,
    },
    {
      name: 'Enable attack mode',
      value: `${packageName} firewall attack-mode on`,
    },
  ],
} as const;
