const { Configuration, DllReferencePlugin } = require('webpack')
const path = require('path')

/**
 * @type { Configuration }
 * 加入上面的代码会config会有类型提示
 */
const config = {
  entry: './main.js',
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    // 使用dll后构建时间 549ms -> 223ms
    new DllReferencePlugin({
      manifest: require('./dll/vue.manifest.json'),
    })
  ]
}

module.exports = config
