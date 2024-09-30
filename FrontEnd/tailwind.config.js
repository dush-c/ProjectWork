
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js",
  ],
  themes: ["light", "dark"],
  plugins: [
    require("daisyui"), require('flowbite/plugin'),
  ],
};
