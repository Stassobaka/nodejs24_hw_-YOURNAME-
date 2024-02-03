const chalk = require('chalk');

function logger(moduleName) {
    const logLevel = process.env.LOG_LEVEL;
    const colorsEnabled = process.env.COLORS_ENABLED === '1';


    return {
        info: function (...message){
            if (logLevel === 'info') {
                colorsEnabled ?  console.log (chalk.blue(moduleName), ...message) : console.log(moduleName, ...message);
            }
            if(logLevel === undefined){
                colorsEnabled ?  console.log (chalk.blue(moduleName), ...message) : console.log(moduleName, ...message);
            }
        },

        warn: function (...message){
            if (logLevel === 'warn' || logLevel === 'info' ) {
                colorsEnabled ?  console.log (chalk.yellow(moduleName), ...message) : console.log(moduleName, ...message);
            }
            if(logLevel === undefined){
                colorsEnabled ?  console.log (chalk.yellow(moduleName), ...message) : console.log(moduleName, ...message);
            }
        },

        error: function (...message){
            if (logLevel === 'error' || logLevel === 'warn' || logLevel === 'info' ) {
                colorsEnabled ?  console.log (chalk.red(moduleName), ...message) : console.log(moduleName, ...message);
            }
            if(logLevel === undefined){
                colorsEnabled ?  console.log (chalk.red(moduleName), ...message) : console.log(moduleName, ...message);
            }
        },
    }
}
module.exports = logger;

