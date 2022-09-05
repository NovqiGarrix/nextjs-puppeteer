const fs = require("fs");

if (!fs.existsSync("./public/screenshots"))
  fs.mkdirSync("./public/screenshots");
