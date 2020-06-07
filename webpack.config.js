const path = require('path');

module.exports = {
   entry: './client/index.js',
   output: {
      path: path.join(__dirname, '/client'),
      filename: 'bundle.js'
   },
   devServer: {
      inline: true,
      port: 8001
   },
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: { presets: ["@babel/env"] }
         },
         {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
         }
      ]
   },
   resolve: {
      modules: [path.resolve(__dirname, 'client'), 'node_modules'],
      extensions: [ '.tsx', '.ts', '.js' ]
   }
}