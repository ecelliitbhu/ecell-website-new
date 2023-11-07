const path = require("path");
const webpack = require("webpack");
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: [
      "images.unsplash.com",
      "firebasestorage.googleapis.com",
      "prayagtandon.github.io",
    ],
  },
  reactStrictMode: true,
  // target: "serverless",
  // webpack: (config) => {
  //   config.plugins.push(new webpack.DefinePlugin({ "global.GENTLY": false }));
  //
  //   config.module.rules.push({
  //     test: /\.html$/,
  //     use: "html-loader",
  //   });
  //   config.module.rules.push({
  //     test: /\.cs$/,
  //     use: "raw-loader",
  //   });
  //   return config;
  // },

  
};
