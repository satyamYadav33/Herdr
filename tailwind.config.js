/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        anthropic: {
          bg: '#FAF9F5',
          card: '#FFFFFF',
          darkBg: '#141413',
          darkCard: '#1E1E1C',
          darkBorder: '#2E2D29',
          border: '#E6E4DC',
          borderStrong: '#D1CEC4',
          accent: '#D97757',
          accentHover: '#C26547',
          accentLight: '#FBF0EC',
          coral: '#D97757',
          sand: '#F2EDE4',
          sandLight: '#F7F4EE',
          sandDark: '#E4DDD2',
          text: '#141413',
          textMuted: '#686660',
          textSubtle: '#8C8980',
          textDarkMuted: '#A09E96',
          slate: '#474541',
          charcoal: '#22211F',
          olive: '#6A7862',
          peach: '#F7E7D9',
          peachDark: '#362A24',
          amber: '#DE8B59'
        }
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'anthropic': '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
        'anthropic-lg': '0 4px 20px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
        'card-hover': '0 8px 30px rgba(217, 119, 87, 0.08), 0 2px 8px rgba(0,0,0,0.04)',
      }
    },
  },
  plugins: [],
}
