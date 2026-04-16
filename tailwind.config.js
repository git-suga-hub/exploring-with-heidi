/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        explorer: { blue: '#1BB7F2', deep: '#0066A4' },
        discovery: { green: '#7CCB32' },
        heidi: { orange: '#F45A28', yellow: '#FFC834' },
        ui: {
          cream: '#FFF2D6',
          teal: '#2ABEB4',
          red: '#EF3E2E',
          charcoal: '#3D3D3D',
          gray: '#DDE6EA'
        }
      },
      borderRadius: { brand: '18px' },
      boxShadow: { brand: '0 8px 20px rgba(0,0,0,0.12)' },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)']
      }
    }
  },
  plugins: []
};