/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,scss}",
  ],
  theme: {
    extend: {},
    gridTemplateColumns: {
      "my": "repeat(3, minmax(0, 1fr))",
    },
    gridTemplateRows: {
      "my": "repeat(3, minmax(0, 1fr))",
    },
  },
  plugins: [      
    forms,
  ],
}

