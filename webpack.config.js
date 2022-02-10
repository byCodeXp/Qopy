const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
   mode: 'development',
   entry: './src/layout/index.tsx',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
   },
   resolve: {
      extensions: ['.js', '.ts', '.tsx']
   },
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            loader: 'ts-loader'
         },
         {
            test: /\.css$/,
            use: [
               'style-loader',
               { 
                  loader: 'css-loader',
                  options: {
                     importLoaders: 1
                  }
               },
               'postcss-loader',
            ],
         }
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: './assets/index.html',
         filename: 'index.html',
         inject: 'body'
      })
   ],
   devServer: {
      historyApiFallback: true,
      port: 1234,
      hot: true
   },
}