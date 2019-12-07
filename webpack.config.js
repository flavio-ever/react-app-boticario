const path = require('path');

module.exports = {
  /**
   * @description Arquivo de entrada
   */
  entry: path.resolve(__dirname, 'src', 'index.js'),
  /**
   * @description Bundle gerado
   */
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  /**
   * @description Servidor local
   */
  devServer: {
    contentBase: path.resolve(__dirname, 'public'), 
  },
  /**
   * @description Regras
   */
  module: {
    /**
     * @description Informar a regra para cada tipo de arquivo 
     * o que ele deve usar. Para arquivos JS = Transpiling com @Babel
     */
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }, 
      {
        test: /\.css$/,
        use: [
          // Css
          { loader: 'style-loader' },
          // Imports feitos de um arquivo css
          { loader: 'css-loader' }
        ]
      },
      {
        test: /.*\.(gif|svg|png|jpe?g)$/i,
        use: {
          loader: 'file-loader'
        }
      }
    ]
  }
}