const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");
// const consoleLog = require("./plugins/consoleLog");

// https://nextjs.org/docs/migrating/incremental-adoption#micro-frontends-with-monorepos-and-subdomains
module.exports = {
  async rewrites() {
    return {
      fallback: [
        {
          source: "/:path*",
          destination: `https://nftext.wotori.com/:path*`,
        },
      ],
    };
  },

  // babel: {
  //   // this was an attemp to modify console.log
  //   plugins: ["macros", [consoleLog]],
  // },
};
