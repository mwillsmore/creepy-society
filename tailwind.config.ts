import type { Config } from 'tailwindcss'

const config: Config = {
  content: ["./app/**/*.{ts,tsx,mdx}", "./content/**/*.{mdx,md}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        comic: ['"Comic Sans MS"', 'Comic Sans', 'cursive'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
