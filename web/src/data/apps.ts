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
    name: 'Loch Macro',
    slug: '/macro',
    tagline: 'Node-based macro scripting for Windows.',
    description:
      'Automate repetitive tasks with a visual flow editor. Build macros from keyboard shortcuts, mouse actions, timers, and conditionals — no code required.',
    color: 'loom-trigger',
    colorHex: '#f97316',
    category: 'Trigger',
    shipped: true,
    version: '0.2.0',
    githubRelease: 'https://github.com/loch-suite/loch-macro-releases/releases/download/v0.2.0/Loch.Macro_0.2.0_x64-setup.exe',
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
    name: 'Loch Scheduler',
    slug: '/scheduler',
    tagline: 'Calendar, tasks, and habits — all offline.',
    description:
      'A personal productivity suite for Windows. Manage your calendar, track tasks with projects and subtasks, and build habits — all stored locally with no accounts required.',
    color: 'loom-flow',
    colorHex: '#8b5cf6',
    category: 'Flow',
    shipped: true,
    version: '0.1.0',
    githubRelease: 'https://github.com/loch-suite/loch-scheduler-releases/releases/download/v0.1.0/Loch.Scheduler_0.1.0_x64-setup.exe',
    icon: 'S',
    sizeMb: 3,
    features: [
      'Calendar with Day, Month, and Year views — recurring events and color tags',
      'Task manager with projects, subtasks, priorities, and due dates',
      'Habit tracker with streaks, heatmap, and flexible frequency rules',
      'Dashboard overview — calendar, tasks, and habits at a glance',
      'Loch Macro integration — link tasks and events directly to macros',
      'Fully offline — no accounts, no cloud, no telemetry',
    ],
  },
  {
    id: 'cookbook',
    name: 'Loch Cookbook',
    slug: '/cookbook',
    tagline: 'Your personal command recipe book.',
    description:
      'Save, organize, and execute your most-used command sequences. Browse, search, and run recipes from a clean local interface.',
    color: 'loom-action',
    colorHex: '#3b82f6',
    category: 'Action',
    shipped: false,
    icon: 'C',
    sizeMb: 5,
  },
  {
    id: 'hardware',
    name: 'Loch Hardware',
    slug: '/hardware',
    tagline: 'System hardware monitoring and control.',
    description:
      'Monitor temps, manage fans, and switch power profiles. Deep hardware insight without the bloat.',
    color: 'loom-sensor',
    colorHex: '#10b981',
    category: 'Sensor',
    shipped: true,
    version: '0.2.3',
    githubRelease: 'https://github.com/loch-suite/loch-hardware-releases/releases/download/v0.2.3/Loch.Hardware_0.2.3_x64-setup.exe',
    icon: 'H',
    sizeMb: 7,
    features: [
      'Real-time CPU, GPU, and memory monitoring',
      'Fan curve editor — set curves by temperature or load',
      'Power plan switcher with per-profile automatic switching',
      'Thermal alerts and configurable warning thresholds',
      'Historical sensor data with local charts',
      'Low-overhead background service — minimal CPU impact',
    ],
  },
  {
    id: 'developer',
    name: 'Loch Developer',
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
    name: 'Loch Finance',
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
