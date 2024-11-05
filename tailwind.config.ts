import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/routePages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "xs-red": "0 4px 8px rgba(219, 0, 7, 0.5)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        leftSectionImage: "url('/images/login_left_image.svg')",
        rightSectionImage: "url('/images/login_right_image.svg')",
      },
      screens: {
        xsm: "340px",
      },
      colors: {
        white: "#f9fafb",
        red: "#ef4444",
        "deep-purple": "#110F1A",
        "dark-navy": "#1A1A2D",
        "bright-pink": "#e30e7a",
        "coral-red": "#f64a67",
        "neon-pink": "#F55FAF",
        "slate-blue": "#303054",
        "dusty-blue": "#718EBF",
        "light-gray": "#EDECF4",
        "muted-purple": "#52528e",
        "deep-green": "#27362C",
        "mint-green": "#CAFFD9",
        yellow: "#F4EA50",
      },
    },
    colors: {},

    //Screens info here only for reference, that we are using default breaking points

    // screens: {
    //   'sm': '640px',
    //   // => @media (min-width: 640px) { ... }

    //   'md': '768px',
    //   // => @media (min-width: 768px) { ... }

    //   'lg': '1024px',
    //   // => @media (min-width: 1024px) { ... }

    //   'xl': '1280px',
    //   // => @media (min-width: 1280px) { ... }

    //   '2xl': '1536px',
    //   // => @media (min-width: 1536px) { ... }
    // }
  },
  plugins: [],
};
export default config;
