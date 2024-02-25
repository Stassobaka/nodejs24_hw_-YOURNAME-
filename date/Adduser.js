const fs = require('fs');
const path = require('path');
const { newUserList } = require('../validate/validate_users');

const users = require('../date/users.json');
const dateFolderPath = path.join('.', 'date');
const filePath = path.join(dateFolderPath, 'users.json');

function writeJsonUser() {
  try {
    const openStream = fs.createWriteStream(filePath);

    process.on('beforeExit', () => {
      openStream.end();
    });

    let jsonData;

    try {
      // Check if the file exists and has content
      const fileContent = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : null;
      jsonData = fileContent ? JSON.parse(fileContent) : {};
    } catch (jsonError) {
      console.error('Error parsing JSON content:', jsonError);
      jsonData = {};
    }

    // Check if yourArrayKey already exists, if yes, update it; otherwise, create a new key
    if (jsonData.hasOwnProperty('yourArrayKey')) {
      jsonData.yourArrayKey = newUserList;
    } else {
      jsonData.yourArrayKey = newUserList;
    }

    const updatedJsonString = JSON.stringify(jsonData, null, 2);

    openStream.write(updatedJsonString);
  } catch (error) {
    console.error('Error writing to users.json:', error);
  }
}

module.exports = writeJsonUser;