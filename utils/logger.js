const chalk = require('chalk');
const loggerStream = require('../loggerStream')
const fs = require('fs');
const path = require('path');

 function logger(moduleName) {
    const logLevel = process.env.LOG_LEVEL;
    const colorsEnabled = process.env.COLORS_ENABLED === '1';
   


    return {
        info:  function (...message){
            if (logLevel === 'info') {
                colorsEnabled ?  console.log (chalk.blue(moduleName), ...message) : console.log(moduleName, ...message); 
                
            };
       function madeDirectory(){
        loggerStream.creatDirectory() 
       }
          
       setTimeout(madeDirectory,100)

        function startStream(){
            loggerStream.writeLoggerInfo(...message)
        }
        
        setTimeout(startStream,1000)
    },

        warn:  function (...message){
            if (logLevel === 'warn' || logLevel === 'info' ) {
                colorsEnabled ?  console.log (chalk.yellow(moduleName), ...message) : console.log(moduleName, ...message);
            }
            if(logLevel === undefined){
                colorsEnabled ?  console.log (chalk.yellow(moduleName), ...message) : console.log(moduleName, ...message);
            }
            
            function madeDirectory(){
                loggerStream.creatDirectory() 
               }
                  
               setTimeout(madeDirectory,100)

            loggerStream.creatDirectory() 
            function startStream(){
                loggerStream.writeLoggerWarn(...message)
            }
            
            setTimeout(startStream,1000)
        },

        error: function (...message){
            if (logLevel === 'error' || logLevel === 'warn' || logLevel === 'info' ) {
                colorsEnabled ?  console.log (chalk.red(moduleName), ...message) : console.log(moduleName, ...message);
            }
            if(logLevel === undefined){
                colorsEnabled ?  console.log (chalk.red(moduleName), ...message) : console.log(moduleName, ...message);
            }
            function madeDirectory(){
                loggerStream.creatDirectory() 
               }
                  
               setTimeout(madeDirectory,100)
           
            function startStream(){
                loggerStream.writeLoggerError(...message)
            }
            setTimeout(startStream,1000)
            
        }
    }
}
module.exports = logger;

