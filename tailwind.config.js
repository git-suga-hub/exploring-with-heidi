/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        explorer: { blue: '#8EDAF5', deep: '#4FAED4' },
        discovery: { green: '#7BC96F' },
        heidi: { orange: '#FF8A7A', yellow: '#FFD166' },
        ui: {
          cream: '#FFF7E8',
          teal: '#7CD6CF',
          red: '#FF7462',
          charcoal: '#31424A',
          gray: '#DFEAF0'
        }
      },
      borderRadius: { brand: '20px' },
      boxShadow: { brand: '0 10px 28px rgba(49,66,74,0.14)' },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)']
      }
    }
  },
  plugins: []
};
