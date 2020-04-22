module.exports = {
  stories: ['../stories/**/*.stories.ts'],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.ts$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    });
    config.resolve.extensions.push('.ts');

    return config;
  }
};
