
// tailwind.config.cjs
module.exports = {
  content: [
    './src/**/*.{html,js,svelte,ts,md}', // Scans all files in the src directory
    './src/routes/**/*.{html,js,svelte,ts,md}',
    // Add any other directories if your components are elsewhere, e.g.,
    // './node_modules/my-ui-kit/**/*.{html,js,svelte,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
