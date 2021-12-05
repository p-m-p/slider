module.exports = {
  stories: ['../stories/**/*.stories.ts'],
  webpackFinal: async (config, {
    configType
  }) => {
    config.module.rules.push({
      test: /\.ts$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }, {
      test: /\.(png|jpe?g|gif)$/i,
      use: 'file-loader'
    });
    config.resolve.extensions.push('.ts');
    return config;
  },
  core: {
    builder: "webpack5"
  }
};