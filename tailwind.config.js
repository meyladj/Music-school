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
          paper: '#FBF9F4',       // Warm sheet music paper
          surface: '#FFFFFF',     // Pure crisp white card
          card: '#F6F2E9',        // Aged manuscript parchment
          parchment: '#EFE8DC',   // Slightly deeper parchment for accents
          border: '#E3DCce',      // Soft stone/paper border
          borderLight: '#ECE6DC', // Subtle border
          ink: '#1C1814',         // Deep espresso ink (primary text)
          inkMuted: '#685F56',    // Warm graphite (secondary text)
          inkLight: '#948B81',    // Muted timestamps / labels
          gold: '#C28422',        // Warm acoustic brass / violin varnish
          goldLight: '#F7E7C8',   // Light brass tint
          goldHover: '#A87018',   // Deeper brass
          terracotta: '#B65324',  // Mediterranean cedar / Algerian terracotta
          cypress: '#2A785E',     // Mediterranean olive / Cypress green
          cypressLight: '#E3F2EB',// Soft green tint for presences
          amberSoft: '#FFF6E5',   // Warm soft alert
          ruby: '#B93838',        // Absences & overdue
          rubyLight: '#FDE8E8',   // Soft red tint
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'soft': '0 2px 14px -2px rgba(45, 36, 28, 0.05)',
        'card': '0 8px 24px -4px rgba(45, 36, 28, 0.07)',
        'elevated': '0 16px 36px -6px rgba(45, 36, 28, 0.10)',
        'glow-gold': '0 0 20px rgba(194, 132, 34, 0.20)',
      }
    },
  },
  plugins: [],
}
