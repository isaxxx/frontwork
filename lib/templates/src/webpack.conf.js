//const isProduction = process.env.NODE_ENV === 'production';
const isProduction = false;
const path = require('path');
const glob = require('glob');
const fs = require('fs');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
let frontworkPath = `${process.cwd()}/lib/assets/js/`;

fs.access(frontworkPath, (err) => {
  if (err) {
    if (err.code === 'ENOENT') {
      frontworkPath = process.cwd() + '/node_modules/frontwork/lib/assets/js/';
    }
  }
});

const PRODUCTION_PLUGINS = [
  new UglifyJSPlugin({
    uglifyOptions: {
      compress: {
        drop_console: true,
      },
    },
    sourceMap: true,
  }),
];

const entries = {};
glob.sync('./src/js/app/*.js').map((filePath) => {
  const fileName = path.basename(filePath);
  if (fileName.charAt(0) !== '_') {
    entries[fileName] = filePath;
  }
});

module.exports = {
  entry: entries,
  output: {
    path: process.cwd() + '/dest/assets/js/',
    filename: '[name]',
  },
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'hidden-source-map' : 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [
          /node_modules/,
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    ie: 11,
                  },
                  useBuiltIns: 'usage',
                  corejs: 3,
                }
              ],
              [
                '@babel/react',
              ]
            ]
          }
        }
      },
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: [
          /node_modules/,
          /lib/,
        ],
        use: {
          loader: 'eslint-loader',
          options: {
            configFile: process.cwd() + '/src/.eslintrc.json',
          }
        }
      },
    ],
  },
  resolve: {
    alias: {
      frontwork: frontworkPath,
    },
    extensions: [
      '.js',
      '.jsx',
    ],
  },
  optimization: {
    minimizer: isProduction ? PRODUCTION_PLUGINS : [],
  },
};
