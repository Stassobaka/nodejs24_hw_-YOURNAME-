require('dotenv').config();

const logger = require('./utils/logger')('main');
const returnDefault =  require('./return_directory')
const fileSync = require('./fileSync')

// logger.info('This is info');
// logger.error('This is Error');
// logger.warn('This is Warn');


returnDefault.clean() // Очистка папок от всех файлов к начальным условиям задачи

// returnDefault.default() // Запись файлов по условию задачи

// fileSync.start() // Решение домашнего задания