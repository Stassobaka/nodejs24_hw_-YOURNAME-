const chalk = require('chalk');

function logger(moduleName) {


    return {
        info: function (...message){
            if (process.env.LOG_LEVEL === 'info') {
                process.env.COLORS_ENABLED === '1' ?  console.log (chalk.blue(moduleName), ...message) : console.log(moduleName, ...message);
                this.warn;
                this.error;
            }
            if(process.env.LOG_LEVEL === undefined){
                process.env.COLORS_ENABLED === '1' ?  console.log (chalk.blue(moduleName), ...message) : console.log(moduleName, ...message);
                this.error;
            }
        },

        warn: function (...message){
            if (process.env.LOG_LEVEL === 'warn' || process.env.LOG_LEVEL === 'info' ) {
                process.env.COLORS_ENABLED === '1' ?  console.log (chalk.yellow(moduleName), ...message) : console.log(moduleName, ...message);
                this.error;
            }
            if(process.env.LOG_LEVEL === undefined){
                process.env.COLORS_ENABLED === '1' ?  console.log (chalk.yellow(moduleName), ...message) : console.log(moduleName, ...message);
                this.error;
            }
        },

        error: function (...message){
            if (process.env.LOG_LEVEL === 'error' || process.env.LOG_LEVEL === 'warn' || process.env.LOG_LEVEL === 'info' ) {
                process.env.COLORS_ENABLED === '1' ?  console.log (chalk.red(moduleName), ...message) : console.log(moduleName, ...message);
            }
            if(process.env.LOG_LEVEL === undefined){
                process.env.COLORS_ENABLED === '1' ?  console.log (chalk.red(moduleName), ...message) : console.log(moduleName, ...message);
                this.error;
            }
        },
    }
} 
module.exports = logger;

