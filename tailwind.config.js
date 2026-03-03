/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core palette from image (top → bottom)
        navy:       '#2E3250',  // dark navy
        steel:      '#9BAAB8',  // muted steel blue
        parchment:  '#DDD9C4',  // warm parchment
        cream:      '#F4F3E8',  // off-white cream (page bg)

        // Semantic text
        ink:        '#2E3250',
        'ink-soft': '#9BAAB8',
        'ink-muted':'#B8B4A0',

        // Card accents — tints derived from the palette
        'card-1': '#EAE8DC',  // light cream
        'card-2': '#D4D9E2',  // steel tint
        'card-3': '#DDD9C4',  // parchment
        'card-4': '#C5CBDA',  // steel mid
        'card-5': '#E2DFD3',  // parchment warm
        'card-6': '#D0D5E0',  // steel pale

        // Navy depth variants
        'navy-light': '#3A3E5C',
        'navy-deep':  '#252840',

        // shadcn-compatible tokens (for Feature108, Badge, Button)
        background:           '#F4F3E8',
        foreground:           '#2E3250',
        muted:                '#E8E6DB',
        'muted-foreground':   '#9BAAB8',
        primary:              '#2E3250',
        'primary-foreground': '#F4F3E8',
        secondary:            '#DDD9C4',
        'secondary-foreground':'#2E3250',
        border:               '#C4C0AD',
        ring:                 '#9BAAB8',
        accent:               '#DDD9C4',
        'accent-foreground':  '#2E3250',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['Cormorant Garamond', 'Georgia', 'ui-serif', 'serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(221, 217, 196, 0.15)',
        'glow-lg': '0 0 60px rgba(221, 217, 196, 0.25)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
