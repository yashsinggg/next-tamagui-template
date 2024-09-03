const { withTamagui } = require("@tamagui/next-plugin");
module.exports = function (name, { defaultConfig }) {
  let config = {
    ...defaultConfig,

    // ...your configuration
  };
  const tamaguiPlugin = withTamagui({
    config: "./tamagui.config.ts",

    components: ["tamagui"],

    appDir: true,

    outputCSS:
      process.env.NODE_ENV === "production" ? "./public/tamagui.css" : null,
    disableExtraction: process.env.NODE_ENV === "development",
  });
  return {
    ...config,

    ...tamaguiPlugin(config),
  };
};
