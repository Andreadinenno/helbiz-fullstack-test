//node will look at this file when requiring the folder
//i export here all the files in the folder
var fs = require("fs");

module.exports = function(app) {
  fs.readdirSync(__dirname).forEach(function(file) {
    if (file == "index.js") return;
    var name = file.substr(0, file.indexOf("."));
    require("./" + name)(app);
  });
};
