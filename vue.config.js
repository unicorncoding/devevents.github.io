module.exports = {
  chainWebpack: config => {
    config.module
      .rule("markdown")
      .test(/\.md/)
      .use("frontmatter-markdown-loader")
      .loader("frontmatter-markdown-loader")
      .end();
  }
};
