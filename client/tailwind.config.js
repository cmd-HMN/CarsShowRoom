/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', "./src/**/*.{js,ts,tsx,jsx}"],
  theme: {
    extend: {
      width: {
        '[length:var(--hover-width)]': 'var(--hover-width)',
      },
      colors: {
        Dark: '#1e2023',
        offWhite: "f3f3f3"
      },
      fontFamily: {
        cute: "Playwrite HR Lijeva",
        cool: ['Georgia', 'sans-serif']
      },
      textColor: {
        Dark: '#131416',
      },
      backgroundColor: {
        Dark: '#1e2023',
        offWhite: "f3f3f3"
      },
    },
  },
  plugins: [
  ],

}
