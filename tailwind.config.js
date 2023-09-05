module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: "#00203D",
      white: "#FFFFFF",
      whiteGray: "#DEE2E6",
      blueL: "#4183D8",
      blueD: "#0E65F0",
      grayb1: "#E0E0E0",
      grayb2: "#E0D0BC",
      red: "#EE0000",
      premB1: "#F7FCFE",
      premB2: "#D6EFFB",
      premB3: "#F7FCFE",
      buttonP1: "rgb(13, 31, 161)",
      buttonPHover: "#2600FE",
      green: "#2A9843",
      black: "#000000",
    },
    extend: {
      textColor: ["group-hover"],
      backgroundImage: {
        background: "url('/images/background.png')",
        logo: "url('/images/logo.png')",
        // 'footer-texture': "url('/img/footer-texture.png')",
      },
    },
  },
  plugins: [],
}
