module.exports = {
  /**
   * Responsaveis por fazer alterar as 
   * funcionalidades do JS que o navegador
   * ainda não entende: Export/Import, ArrowFunc, JSX e etc...
   */
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: ['@babel/plugin-proposal-class-properties']
}