/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,scss}",
  ],
  theme: {
    extend: {},
  },
  plugins: [      
    forms,
  ],
}

