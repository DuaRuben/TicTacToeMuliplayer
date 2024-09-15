const webpack = require('webpack');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    "path": require.resolve("path-browserify"),
    "os": require.resolve("os-browserify/browser"),
    "crypto": require.resolve("crypto-browserify"),
    "buffer": require.resolve('buffer/'),
    "stream": require.resolve('stream-browserify'),
    "process": require.resolve('process')
  };

  config.plugins = [
    ...(config.plugins || []),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser'
    }),
  ];

  return config;
};
