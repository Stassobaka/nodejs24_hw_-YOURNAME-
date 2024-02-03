const chalk = require('chalk');

function logger(moduleName) {
    const logLevel = process.env.LOG_LEVEL;
    const colorsEnabled = process.env.COLORS_ENABLED === '1';


    return {
        info: function (...message){
            if (logLevel === 'info') {
                // працює тільки коли в process.env.LOG_LEVEL значення 'info'
                colorsEnabled ?  console.log (chalk.blue(moduleName), ...message) : console.log(moduleName, ...message);
            }
        },

        warn: function (...message){
            if (logLevel === 'warn' || logLevel === 'info' || logLevel === undefined) {
                // працює коли в process.env.LOG_LEVEL значення 'info', 'warn' або нічого
                colorsEnabled ?  console.log (chalk.yellow(moduleName), ...message) : console.log(moduleName, ...message);
            }
        },

        error: function (...message){
            // працює завжди, по умовах задачі у нас немає випадків коли метод error() має бути відключений
            colorsEnabled ?  console.log (chalk.red(moduleName), ...message) : console.log(moduleName, ...message);
        }
    }
}
module.exports = logger;

