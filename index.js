var mod = require('modmod')('fs', 'chalk', 'util', 'wiredep', 'multiline');

module.exports = mod.multiline(function () {/*
<!-- bower:css -->
<!-- endbower -->

<!-- bower:js -->
<!-- endbower -->
*/});

mod.fs.watchFile(__filename, { interval: 0 }, function () {
  delete require.cache[__filename];

  console.log(mod.chalk.red.bold('\n\nresults.'));
  console.log(mod.chalk.blue(require(__filename)));

  // reset file.
  mod.fs.unwatchFile(__filename);
  mod.wiredep({
    src: __filename,
    bowerJson: { dependencies: {} }
  });
});

console.log(mod.chalk.red.bold('\n\ndependency tree.'));
console.log(mod.util.inspect(mod.wiredep({
  src: __filename
}), false, null));
