/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';
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
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            h1: {
              color: theme('colors.gray.900'),
            },
            h2: {
              color: theme('colors.gray.900'),
            },
            h3: {
              color: theme('colors.gray.900'),
            },
            strong: {
              color: theme('colors.gray.900'),
            },
            a: {
              color: theme('colors.blue.500'),
              '&:hover': {
                color: theme('colors.blue.700'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    typography,
  ],

}
