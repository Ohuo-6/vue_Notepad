const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:'warning',
  // lintOnSave: false 关闭eslint校验工具， 控制台不报错，编译通过。
  // lintOnSave: 'warning' 控制台提示错误，编译通过
})
