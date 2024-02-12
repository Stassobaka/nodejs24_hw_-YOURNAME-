require('dotenv').config();

const logger = require('./utils/logger')('main');
const returnDefault =  require('./return_directory')
const fileSync = require('./fileSync')

logger.info('This is info');
logger.error('This is Error', new Error('i am error'));
logger.warn('This is Warn', { context: 42 });


returnDefault.clean() // Очистка папок от всех файлов к начальным условиям задачи

// returnDefault.default() // Запись файлов по условию задачи

// fileSync.start() // Решение домашнего задания