/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    {
      pattern:
        /(bg|text|border)-(slate|gray|red|amber|emerald|blue|indigo|purple|rose)-(50|100|200|300|400|500|600|700|800|900)/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

