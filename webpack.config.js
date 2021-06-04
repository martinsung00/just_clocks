const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DIST_DIR = path.join(__dirname, "/dist");
const SRC_DIR = path.join(__dirname, "/src/client");

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  externals: {
    cheerio: "window",
    "react/lib/ExecutionEnvironment": true,
    "react/lib/ReactContext": true,
  },
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  output: {
    filename: "bundle.js",
    path: DIST_DIR,
  },
};
