/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        music: {
          paper: '#F9F6F0',       // Warm sun-drenched architectural paper
          surface: '#FFFFFF',     // Pure crisp white card
          card: '#FBF8F3',        // Warm ivory parchment
          parchment: '#F3EDE4',   // Slightly deeper parchment for accents
          border: '#E8E1D7',      // Soft warm stone border
          borderLight: '#EFEAE3', // Subtle border
          ink: '#1A1715',         // Deep obsidian/espresso ink (primary text)
          inkMuted: '#665E56',    // Warm graphite (secondary text)
          inkLight: '#948B81',    // Muted timestamps / labels
          gold: '#C28422',        // Warm acoustic brass / violin varnish
          goldLight: '#F7E7C8',   // Light brass tint
          goldHover: '#A87018',   // Deeper brass
          terracotta: '#9B3B2B',  // Algiers warm Mediterranean terracotta
          terracottaHover: '#822F21',
          terracottaLight: '#F7ECE9',
          cypress: '#2A785E',     // Mediterranean olive / Cypress green
          cypressLight: '#E3F2EB',// Soft green tint for presences
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        cursive: ['"Caveat"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'soft': '0 2px 14px -2px rgba(45, 36, 28, 0.05)',
        'card': '0 8px 24px -4px rgba(45, 36, 28, 0.07)',
        'elevated': '0 16px 36px -6px rgba(45, 36, 28, 0.10)',
      }
    },
  },
  plugins: [],
}
