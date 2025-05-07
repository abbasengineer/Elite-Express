// Color scheme based on Elite Express Car Wash logo
// tailwind.config.js
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#3498db',     // Light blue from logo
        secondary: '#f5f5f5',   // Light gray/white
        background: '#f9fafb',  // Very light background
        text: '#333333',        // Dark text
        accent: '#ffffff',      // White accents
      },
    },
  },
  plugins: [],
}