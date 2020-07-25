const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: "./src/index.ts", // 入口
  output: { // 输出
    filename: "main.js",
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  devtool: process.env.NODE_ENV ==='production' ? false: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    stats: 'errors-only', // 只在控制台输出错误信息
    compress: false, // 不启用压缩
    host: 'localhost',
    port: 8089
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['./dist'] // 打包之前需要清理的目录
    }),
    new HtmlWebpackPlugin({
      template: './src/template/index.html'
    })
  ]
}