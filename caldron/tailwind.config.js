/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem'
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      }
    },
    extend: {
      colors: {
        color1: '#0A76BD',
        color2: '#EA1B8F',
        color3: '#F2F02D',
        color4: 'rgb(81, 203, 255)',
      },
      // fontFamily: {
      //   custom: ['Times New Roman', 'sans'],
      // },
      keyframes: {
        'motion':{
          '0%, 100%':{left: '25%'},
          '50%': {left: '72%'}
        },
      },
      animation: {
        'slow-motion': 'motion 5s linear infinite',
      },
    },
  },
  // plugins: [
  //   function ({ addUtilities }) {
  //     const animationDelays = {
  //       '.delay-1': {
  //         animationDelay: '1000ms',
  //       },
  //       '.delay-2': {
  //         animationDelay: '2000ms',
  //       },
  //       // Add more delay classes as needed
  //     };

  //     addUtilities(animationDelays, ['responsive', 'hover']);
  //   },
  // ],
}
