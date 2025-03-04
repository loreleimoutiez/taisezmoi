import daisyui from 'daisyui';

export default {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        fuchsia: '#fd3f92',
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#d600ff",
          secondary: "#000000",
          accent: "#1e2732",
          neutral: "#15202b",
          "base-100": "#113338",
          "base-content": "#ffffff",
          info: "#2294ff",
          success: "#009b6f",
          warning: "#ff7700",
          error: "#b50000",
        },
      },
    ],
  },
  variants: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
};
