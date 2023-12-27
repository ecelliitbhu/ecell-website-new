const path = require("path");
const { parsed: localEnv } = require("dotenv").config();
const webpack = require("webpack");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "prayagtandon.github.io",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
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
