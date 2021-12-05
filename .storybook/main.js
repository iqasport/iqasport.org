const path = require('path');

const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
  typescript: { reactDocgen: false },
  stories: [
    '../styles/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../components/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-next-router',
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  staticDirs: ['../public'],
  webpackFinal: async (config, { configType }) => {
    config.resolve.modules = [path.resolve(__dirname, '..'), 'node_modules'];
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../'),
      '@emotion/core': toPath('node_modules/@emotion/react'),
      '@emotion-theming': toPath('node_modules/@emotion/react'),
    };
    return config;
  },
};
