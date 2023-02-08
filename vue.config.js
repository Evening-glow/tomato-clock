const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  assetsDir: 'static',
  css: {
    loaderOptions: {
      less: {
        additionalData: '@import "src/root.less";'
      },
    }
  },
})
