// tailwind.config.js
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#3498db',     // Current blue
          darkBlue: '#2980b9', // Darker blue for gradients
          green: '#a4c639',    // The lime green from image
          darkGreen: '#8aaa30' // Darker green for gradients
        },
        secondary: '#f5f5f5',  // Light gray/white
        background: '#f9fafb', // Very light background
        text: '#333333',       // Dark text
        accent: {
          yellow: '#f1c40f',   // Gold/yellow accent
          red: '#e74c3c'       // For sign out button
        }
      },
    },
  },
  plugins: [],
}