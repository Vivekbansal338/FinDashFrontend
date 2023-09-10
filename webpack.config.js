const path = require("path");

module.exports = {
  resolve: {
    fallback: {
      stream: require.resolve("stream-browserify"),
      path: require.resolve("path-browserify"),
      os: require.resolve("os-browserify/browser"),
      crypto: require.resolve("crypto-browserify"),
    },
  },
};
