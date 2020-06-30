const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://coding-forum.herokuapp.com/" || "http://localhost:3001",
      changeOrigin: true,
    })
  );
};
