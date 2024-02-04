const fs = require('fs');
const path = require('path');

const logger = require('./utils/logger')('main');

const fileSync = {
    start: function () {
        const source = 'source';
        const target = 'target';

        const absolutePathSource = path.resolve(source);
        const absolutePathTarget = path.resolve(target);

        function addFile(newFile, directory) {
            fs.readdir(directory, (error, result) => {
                if (error) {
                    logger.error(`Ошибка при чтении  ${directory}: ${error}`);
                    return;
                }

                if (result.includes(newFile)) {
                    logger.warn(`Файл содержиться в папке ${newFile}`)
                }else{
                    const filePath = path.join(directory, newFile);
                    fs.writeFile(filePath, '', (err) => {
                        if (err) {
                            logger.error(`Ошибка при создании файла ${filePath}: ${err}`);
                        } else {
                            logger.info(`Файл ${newFile} успешно создан.`);
                        }
                    });
                }
            });
        }

        function addDirectory(nameDirectory, linkDirectory, oldDirectory) {
            fs.readdir(linkDirectory, (error, result) => {
                if (error) {
                    logger.error(`Ошибка при чтении  ${linkDirectory}: ${error}`);
                    return;
                }

                if (result.includes(nameDirectory)) {
                    logger.warn(`Папка ${nameDirectory} сдержится в каталоге`)
                }else{
                    const newDirectory = path.join(linkDirectory, nameDirectory);
                    fs.mkdir(newDirectory, (err) => {
                        if (err) {
                            logger.error(`Ошибка при создании  ${newDirectory}: ${err}`);
                        } else {
                            logger.info(`Директория ${newDirectory} успешно создана.`);
                            const includDirectory = path.join(oldDirectory,nameDirectory )
                            const icludSecondDirectory = path.join(linkDirectory,nameDirectory )
                            findFile(includDirectory, icludSecondDirectory )
                        }
                    });
                }
            });
        }

        function findFile(link, secondlinl) {
            fs.readdir(link, (error, result) => {
                if (error) {
                    logger.error(`Ошибка при чтении ${link}: ${error}`);
                    return;
                }

                result.forEach((item) => {
                    const fullLink = path.join(link, item);
                    fs.stat(fullLink, (err, stats) => {
                        if (err) {
                            logger.error(`Ошибка файле ${fullLink}: ${err}`);
                            return;
                        }

                        if (stats.isFile()) {
                            addFile(item, secondlinl);
                        }

                        if (stats.isDirectory()) {    
                            addDirectory(item, secondlinl,link);
                        }
                    });
                });
            });
        }

        findFile(absolutePathSource,absolutePathTarget );
    }
};

module.exports = fileSync;
