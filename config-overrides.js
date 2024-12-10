module.exports = function override(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      zlib: require.resolve('browserify-zlib'),
      querystring: require.resolve('querystring-es3'),
    };
    return config;
  };
  