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

export const firewallCommand = {
  name: 'firewall',
  aliases: [],
  description: 'Manage your project firewall configuration',
  hidden: true as const,
  arguments: [],
  subcommands: [
    statusSubcommand,
    diffSubcommand,
    publishSubcommand,
    discardSubcommand,
    ipBlocksSubcommand,
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
      name: 'Show pending changes',
      value: `${packageName} firewall diff`,
    },
    {
      name: 'Block an IP address',
      value: `${packageName} firewall ip-blocks block 1.2.3.4`,
    },
    {
      name: 'Add a system bypass for an IP',
      value: `${packageName} firewall system-bypass add 10.0.0.1`,
    },
    {
      name: 'Enable attack mode',
      value: `${packageName} firewall attack-mode on`,
    },
  ],
} as const;
