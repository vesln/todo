module.exports = function(keywords) {
  var include = [];
  var exclude = [];

  (keywords || []).forEach(function(keyword) {
    if (keyword[0] === '~') {
      exclude.push(keyword.replace(/^~/, ''));
    } else {
      include.push(keyword);
    }
  });

  return function filter(str) {
    var match = include.length === 0 ? true : false;
    var keep = true;

    include.forEach(function(keyword) {
      if (~str.indexOf(keyword)) match = true;
    });

    if (!match) return false;

    exclude.forEach(function(keyword) {
      if (~str.indexOf(keyword)) keep = false;
    });

    return keep;
  };
};
