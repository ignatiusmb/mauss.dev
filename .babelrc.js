module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-transform-object-assign',
      '@babel/plugin-proposal-object-rest-spread',
    ],
  };
};
