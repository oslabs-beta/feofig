const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const entry = path.resolve(__dirname, './client/src/index.js');

const output = {
  path: path.resolve(__dirname, 'dist'),
  filename: 'bundle.js',
};

module.exports = {
  mode: 'development',
  entry,
  output,
  module: {
    rules: [
      {
        test: /\.jsx?/,
        // exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              ['@babel/preset-react', { targets: 'defaults' }],
            ],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        // exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './client/public/index.html'),
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
      publicPath: '/',
    },
    host: 'localhost',
    port: 8080,
    headers: { 'Access-Control-Allow-Origin': '*' },
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['.jsx', '.js', '.tsx', '.ts'],
    fallback: {
      fs: false,
      async_hooks: false,
    },
  },
};
