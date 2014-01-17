var fs = require('fs');

function Storage(path) {
  this.path = path;
}

Storage.prototype.read = function() {
  var ret = [];

  try {
    var contents = fs.readFileSync(this.path, 'utf8');
    ret = JSON.parse(contents);
  } catch(e) {}

  return ret;
};

Storage.prototype.save = function(data) {
  var json = JSON.stringify(data);
  fs.writeFileSync(this.path, json, 'utf8');
};

module.exports = Storage;
