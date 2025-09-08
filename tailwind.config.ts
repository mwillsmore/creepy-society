import type { Config } from 'tailwindcss'

const config: Config = {
  content: ["./app/**/*.{ts,tsx,mdx}", "./content/**/*.{mdx,md}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
