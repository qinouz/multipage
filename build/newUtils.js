const path = require('path')
var glob = require("glob")

exports.getEntry = function (globPath) {
  var entries = {},
    basename, tmp, pathname;
  if (typeof (globPath) != "object") {
    globPath = [globPath]
  }
  globPath.forEach((itemPath) => {
    glob.sync(itemPath).forEach(function (entry) {
      basename = path.basename(entry, path.extname(entry));  // 主文件名
      // console.log("basename", basename)
      // console.log(entry)
      // console.log(entry.split('/'))
      tmp = entry.split('/').slice(3, -1);
      // console.log(tmp)
      pathname = tmp.join("/"); // 正确输出js和html的路径
      // console.log("pathname", pathname)
      entries[pathname] = entry;
    });
  });
  return entries;
}

exports.getEntryPages = function (pages) {
  var entries = {};
  for (var pathname in pages) {
    // 配置生成的html文件，定义路径等
    let middlePath = pages[pathname].split('.html')[0];
    var conf = {
      entry: middlePath + '.js',
      template: pages[pathname],   // 模板路径
    };
    entries[pathname] = conf;
  }
  return entries;
}


