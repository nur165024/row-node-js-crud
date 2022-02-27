/**
 * title: file system
 * description: file system library
 * name: nure alam
 * date: 26-2-2022
 */

// dependence
const fs = require('fs');
const path = require('path');

// module scaffolding
const lib = {};

// base directory of the data folder
lib.basedir = path.join(__dirname, '/../.data/');

// write data to file
lib.create = (dir, file, data, callback) => {
  fs.open(`${lib.basedir + dir}/${file}.json`, 'wx', (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      // convert data to string
      const stringData = JSON.stringify(data);

      // write data to file and close it
      fs.writeFile(fileDescriptor, stringData, (err2) => {
        if (!err2) {
          fs.close(fileDescriptor, (err3) => {
            if (!err3) {
              callback(false);
            } else {
              callback('Error close the new file');
            }
          });
        } else {
          callback('Error writing to new file');
        }
      });
    } else {
      callback('Could not create new file, it may already exists!');
      // callback(err);
    }
  });
};

// read data from file
lib.read = (dir, file, callback) => {
  fs.readFile(`${lib.basedir + dir}/${file}.json`, 'utf8', (err, data) => {
    callback(err, data);
  });
};

// update existing file
lib.update = (dir, file, data, callback) => {
  fs.open(`${lib.basedir + dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      // convert then data to string
      const stringData = JSON.stringify(data);

      // truncate data
      fs.ftruncate(fileDescriptor, (err2) => {
        if (!err2) {
          // write to file and close it
          fs.writeFile(fileDescriptor, stringData, (err3) => {
            if (!err3) {
              // close the file
              fs.close(fileDescriptor, (err4) => {
                if (!err4) {
                  callback(false);
                } else {
                  callback('Error close file!');
                }
              });
            } else {
              callback('Error write file!');
            }
          });
        } else {
          callback('Error close to file');
        }
      });
    } else {
      // callback('Error truncating file!');
      callback(err);
    }
  });
};

// delete existing file
lib.delete = (dir, file, callback) => {
  fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
    if (!err) {
      callback(false);
    } else {
      callback('Error deleting file');
    }
  });
};

module.exports = lib;
