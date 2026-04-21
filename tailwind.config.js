/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./app/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins'],
        'poppins-medium': ['Poppins-Medium'],
        'poppins-semibold': ['Poppins-SemiBold'],
        'poppins-bold': ['Poppins-Bold'],
      },
      fontSize: {
        md: '16px',
        lg: '17px',
      },
      colors: {
        'grad-start': '#AEDC81',
        'grad-end': '#6CC51D',
      },
      backgroundImage: {
        'btn-gradient': 'linear-gradient(91.78deg, #AEDC81 1.21%, #6CC51D 100.55%)',
      },
      boxShadow: {
        'btn-shadow': '0px 10px 9px rgba(108, 197, 29, 0.25)',
      },
    },
  },
  plugins: [],
}
