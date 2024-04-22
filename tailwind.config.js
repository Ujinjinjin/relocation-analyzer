import typography from '@tailwindcss/typography'
import forms from '@tailwindcss/forms'
import flowbite from 'flowbite/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    typography,
    forms,
    flowbite,
  ],
}

