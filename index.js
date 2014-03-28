var M = require('modmod')('fs', 'chalk', 'util', 'wiredep', 'multiline');

module.exports = M.multiline(function () {/*
<!-- bower:css -->
<!-- endbower -->

<!-- bower:js -->
<!-- endbower -->
*/});

M.fs.watchFile(__filename, { interval: 1000 }, function () {
  delete require.cache[__filename];

  console.log(M.chalk.red.bold('\n\nresults.'));
  console.log(M.chalk.blue(require(__filename)));

  // reset file.
  M.fs.unwatchFile(__filename);
  M.wiredep({
    src: __filename,
    bowerJson: { dependencies: {} }
  });
});

if (module.exports.length < 100) {
  console.log(M.chalk.red.bold('\n\ndependency tree.'));
  console.log(M.util.inspect(M.wiredep({
    src: __filename
  }), false, null));
}
