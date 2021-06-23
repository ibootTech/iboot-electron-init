const path = require('path')
module.exports = {
  entry: {
    app: path.join(__dirname, 'src/main/index.ts'),
    preload: path.join(__dirname, 'src/main/preload.ts')
  },
  plugins: [],
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist')
  },
  target: 'electron-main',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/
      }
    ]
  }
}
