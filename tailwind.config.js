/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E11D48',
          dark: '#BE123C',
          light: '#FB7185',
        },
        dark: {
          DEFAULT: '#111827',
          light: '#1F2937',
          pure: '#0B0F17'
        }
      },
      fontFamily: {
        sans: ['"Noto Sans KR"', '"Inter"', 'sans-serif'],
        serif: ['"Noto Sans KR"', 'serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
