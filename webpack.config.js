'use strict';

const path = require(`path`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);

module.exports = {
  mode: `development`, // Режим сборки
  entry: `./src/main.js`, // Точка входа приложения
  output: { // Настройка выходного файла
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  devtool: `source-map`,
  module: {
    rules: [{
      test: /\.js$/,
      use: `babel-loader`
    }]
  },
  plugins: [ // Расширяем функциональность плагинами
    new HtmlWebpackPlugin({ // Создаем инстанс плагина
      template: `./src/index.html` // …передав в него необходимые ему параметры
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, `public`),
    // Где искать сборку
    publicPath: `http:!/localhost:8080/`,
    // Веб адрес сборки
    compress: true, // Сжатие
    // Автоматическая перезагрузка страницы
    // Если не работает по стандартному URLу в браузере ‘http:!/localhost:8080’,
    // то добавьте к нему ‘/webpack-dev-server/‘: ‘http:!/localhost:8080/webpack-dev-server/'
    watchContentBase: true
  }

};
