/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,scss}",
  ],
  theme: {
    extend: {},
    // fontSize: {
    //   vws: ['.5vw'],
    //   vwm: ['.8vw'],
    //   vwl: ['2vw'],
    //   vwxl: ['3vw'],
    // }
  },
  plugins: [      
    forms,
  ],
}

