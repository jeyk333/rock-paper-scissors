/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'light-brown': 'var(--light-brown)',
        'dark-100': 'var(--dark-100)',
        'dark-200': 'var(--dark-200)',
        'white-shade': 'var(--white-shade)',
        'light-blue': 'var(--light-blue)',
        blue: 'var(--blue)',
        'active-blue': 'var(--active-blue)',
        'light-green': 'var(--light-green)',
        green: 'var(--green)',
        red: 'var(--red)',
        'light-red': 'var(--light-red)',
        'light-grey': 'var(--light-grey)',
        grey: 'var(--grey)'
      }
    }
  },
  plugins: []
};
