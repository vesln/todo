function keep(str, arr) {
  return arr.filter(function(keyword) {
    return ~str.indexOf(keyword);
  }).length === 0;
}

function match(str, arr) {
  if (!arr.length) return true;
  return arr.filter(function(keyword) {
    return ~str.indexOf(keyword);
  }).length > 0;
}

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
    return match(str, include) && keep(str, exclude);
  };
};
