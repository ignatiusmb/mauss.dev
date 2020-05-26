module.exports = {
  testPathIgnorePatterns: ['/node_modules/', '/cypress/'],
  transform: {
    '^.+\\.svelte$': 'svelte-test/transform',
    '^.+\\.js$': 'babel-jest',
  },
};
