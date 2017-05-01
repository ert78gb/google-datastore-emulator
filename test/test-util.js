'use strict';
const fs = require('fs');

module.exports.directoryExists = function directoryExists(dir) {
  try {
    const stat = fs.statSync(dir);

    return stat.isDirectory();
  }
  catch (error) {
    return false;
  }
};

module.exports.fileExists = function fileExists(file) {
  try {
    const stat = fs.statSync(file);

    return stat.isFile();
  }
  catch (error) {
    return false;
  }
};
