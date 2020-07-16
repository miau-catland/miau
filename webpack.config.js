const path = require('path');

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  devtool: 'source-map',
  context: __dirname,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: '@ts-tools/webpack-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|woff2|woff|ttf)$/,
        loader: 'file-loader',
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'less-loader',
        ],        
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.json'],
    plugins: [new TsconfigPathsPlugin({ configFile: require.resolve('./tsconfig.json') })],
    alias: {
      "../../theme.config$": require.resolve("./semantic-ui/theme.config"),
      "../semantic-ui/site": path.join(__dirname, "/semantic-ui/site")
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),
  ],
};
