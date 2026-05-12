/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ink: "#09090B",
        cloud: "#F8FAFC",
        mist: "#EEF2F7",
        premiumBlue: "#2563EB",
        royal: "#7C3AED",
        emerald: "#10B981",
        orange: "#F97316",
      },
    },
  },
  plugins: [],
};
