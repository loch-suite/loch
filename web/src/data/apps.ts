export interface App {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  color: string;
  colorHex: string;
  category: string;
  shipped: boolean;
  version?: string;
  githubRelease?: string;
  icon: string;
  features?: string[];
  sizeMb?: number;
}

export const APPS: App[] = [
  {
    id: 'macro',
    name: 'Loom Macro',
    slug: '/macro',
    tagline: 'Node-based macro scripting for Windows.',
    description:
      'Automate repetitive tasks with a visual flow editor. Build macros from keyboard shortcuts, mouse actions, timers, and conditionals — no code required.',
    color: 'loom-trigger',
    colorHex: '#f97316',
    category: 'Trigger',
    shipped: true,
    version: '0.1.0',
    githubRelease: 'https://github.com/vidathegoat/loom-macro/releases/latest',
    icon: 'M',
    sizeMb: 8,
    features: [
      'Visual flow editor with 20+ built-in node types',
      'Keyboard, mouse, timer, and event triggers',
      'Humanize mode for realistic timing variation',
      'Variable engine — store and transform values',
      'Multiple profiles — organize by context',
      'Fully offline — no accounts, no telemetry',
    ],
  },
  {
    id: 'scheduler',
    name: 'Loom Scheduler',
    slug: '/scheduler',
    tagline: 'Time-aware task orchestration.',
    description:
      'Schedule recurring jobs, set time-based triggers, and build automated workflows that run on your terms — cron-like power with a human interface.',
    color: 'loom-flow',
    colorHex: '#8b5cf6',
    category: 'Flow',
    shipped: false,
    icon: 'S',
    sizeMb: 6,
  },
  {
    id: 'cookbook',
    name: 'Loom Cookbook',
    slug: '/cookbook',
    tagline: 'Your personal command recipe book.',
    description:
      'Save, organize, and execute your most-used command sequences. Browse, search, and run recipes from a clean local interface.',
    color: 'loom-sensor',
    colorHex: '#10b981',
    category: 'Sensor',
    shipped: false,
    icon: 'C',
    sizeMb: 5,
  },
  {
    id: 'hardware',
    name: 'Loom Hardware',
    slug: '/hardware',
    tagline: 'System hardware monitoring and control.',
    description:
      'Monitor temps, manage fans, and switch power profiles. Deep hardware insight without the bloat.',
    color: 'loom-action',
    colorHex: '#3b82f6',
    category: 'Action',
    shipped: false,
    icon: 'H',
    sizeMb: 7,
  },
  {
    id: 'developer',
    name: 'Loom Developer',
    slug: '/developer',
    tagline: 'A toolkit for developers.',
    description:
      'Regex tester, JSON formatter, hash generator, base encoder, diff tool — all the small utilities you reach for daily, in one offline app.',
    color: 'loom-variable',
    colorHex: '#f59e0b',
    category: 'Variable',
    shipped: false,
    icon: 'D',
    sizeMb: 5,
  },
  {
    id: 'finance',
    name: 'Loom Finance',
    slug: '/finance',
    tagline: 'Local-first personal finance.',
    description:
      'Budget, track expenses, and visualize spending — all stored on your machine. No bank sync, no cloud, no subscriptions.',
    color: 'loom-cyan',
    colorHex: '#22d3ee',
    category: 'Monitor',
    shipped: false,
    icon: 'F',
    sizeMb: 6,
  },
];

export const SHIPPED_APPS = APPS.filter((a) => a.shipped);
export const COMING_APPS  = APPS.filter((a) => !a.shipped);
