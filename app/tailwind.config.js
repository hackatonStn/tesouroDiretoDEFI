module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'tall': { 'raw': '(min-height: 1100px)' },
        // => @media (min-height: 1100px) { ... }
      },
      colors: {
        base: {
        400 : '#3A393D'
        }
      },
      fontSize: {
        'sm': ['0.875rem','1.1rem']
      }


    },
  },



  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require('@tailwindcss/aspect-ratio'),
    require('daisyui'),

  ],
  daisyui: {
    themes: [ // 👇 only these 4 themes will be included
      {
        dark: {


          "primary": "#99EB0F",
          "secondary": "#1A09F1",
          "accent": "#F50524",
          
          "neutral-focus":"#e5e7eb",
          "neutral": "#d1d5db",
          "neutral-content": "#9ca3af",


          "base-100": "black",
          "base-200": "#1f1f1f",
          "base-300": "#1f1f1f",
          "base-400": "#3A393D",
          
          "info": "#0BC8EF",
          "success": "#72B11F",
          "warning": "#fcd34d",
          "error": "#F50524",
        },
        light: {

          "primary": "#570DF8",

          "secondary": "#246A9F",

          "accent": "#99EB0F",

          "neutral": "#636464",

          "base-100": "#FAFAFB",
          "base-200": "#F3F4F6",
          "base-300": "#F3F4F6",
          "base-400": "#E5E7EB",

          "info": "#0D9AFF",

          "success": "#1AFF9C",

          "warning": "#FFF133",

          "error": "#FF4040",
        },

      },
    ]
  }
}
