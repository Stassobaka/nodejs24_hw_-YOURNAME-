const fs = require('fs');
const path = require('path');
const { newUserList } = require('../validate/validate_users');

const users = require('../date/users.json');
const dateFolderPath = path.join('.', 'date');
const filePath = path.join(dateFolderPath, 'users.json');

function writeJsonUser() {
  // Use fs.createWriteStream with the file path, not the directory
  const openStream = fs.createWriteStream(filePath);

  process.on('beforeExit', () => {
    openStream.end();
  });

  let jsonData = JSON.parse(users);
  jsonData.yourArrayKey = newUserList;
  const updatedJsonString = JSON.stringify(jsonData, null, 2);

  openStream.write(updatedJsonString);
}

module.exports = writeJsonUser;
