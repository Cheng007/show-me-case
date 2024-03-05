const { Configuration, DllPlugin } = require('webpack')
const path = require('path')

/**
 * @type { Configuration }
 * 加入上面的代码会config会有类型提示
 * @description
 * dll 可用于将三方库单独打包，以免每次构建时都重新编译这些依赖
 */
const config = {
  entry: {
    // 提取第三方依赖
    vue: ['vue', 'vue-router', 'pinia'],
  },
  mode: 'development',
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, 'dll')
  },
  plugins: [
    new DllPlugin({
      // 缓存文件
      path: path.resolve(__dirname, 'dll', '[name].manifest.json'),
      name: '[name]'
    })
  ]
}

module.exports = config
