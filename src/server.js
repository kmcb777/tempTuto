import render from "./app/render"

var express = require('express')
var app = express()

require("../webpack/server")

app.use(render)

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log(`Express ${app.get("env")} server listening on ${app.get("port")}`);
});
