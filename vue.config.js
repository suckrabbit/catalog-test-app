module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/scss/variables.scss";  @import "~@/assets/scss/font.scss";',
      },
    },
  },
};
