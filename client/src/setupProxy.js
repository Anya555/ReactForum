const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:3001 || https://coding-forum.herokuapp.com/",
      changeOrigin: true,
    })
  );
};
