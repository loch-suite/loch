/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        loom: {
          base:     '#0a0a0c',
          elevated: '#111114',
          raised:   '#18181c',
          text:     '#f5f5f7',
          trigger:  '#f97316',
          action:   '#3b82f6',
          flow:     '#8b5cf6',
          sensor:   '#10b981',
          variable: '#f59e0b',
          cyan:     '#22d3ee',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', '-apple-system', 'system-ui', 'sans-serif'],
        loom:    ['-apple-system', '"Segoe UI Variable Text"', '"Segoe UI"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        chip:   '3px',
        input:  '4px',
        panel:  '8px',
        window: '10px',
      },
      letterSpacing: {
        brand:   '0.12em',
        section: '0.1em',
        button:  '0.08em',
        tight:   '0.02em',
      },
      boxShadow: {
        'loom-window':  '0 24px 64px rgba(0,0,0,0.7), 0 4px 16px rgba(0,0,0,0.5)',
        'loom-node':    '0 2px 8px rgba(0,0,0,0.4)',
        'loom-popover': '0 10px 28px rgba(0,0,0,0.65)',
        'loom-dropdown':'0 6px 16px rgba(0,0,0,0.5)',
      },
      transitionDuration: {
        instant: '80ms',
        fast:    '120ms',
        normal:  '180ms',
        panel:   '220ms',
      },
    },
  },
  plugins: [],
};
