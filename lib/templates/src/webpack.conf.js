module.exports = {
  entry: './src/js/app/app.js',
  output: {
    path: process.cwd() + '/dest/assets/js/',
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env']
          }
        }
      },
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: [
          /node_modules/,
          /lib/
        ],
        use: {
          loader: 'eslint-loader',
          options: {
            configFile: './src/.eslintrc.json'
          }
        }
      }
    ]
  }
};
