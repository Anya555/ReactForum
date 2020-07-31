const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes");
const db = require("./models");
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("build"));
}
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// force:true is essentially the same as DROP DATABASE IF EXISTS ///
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
});
