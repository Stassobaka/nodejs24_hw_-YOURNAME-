const fs = require('fs');
const path = require('path');
const {Writable} = require('stream')


const loggerStream = {


    creatDirectory:   function (){

        async function  creatDirectory(){
            fs.readdir('.',  function (err, result){
                if(err){
                    console.log('error')
                }else{
                     if( !result.includes('logs')){
                         fs.mkdir('logs' , function (err){
                              if(err){
                                console.log('Директория Logs не создана',err)
                              }else{
                                createFile()
                              }})
                    }
                }
            })
        }

        function createFile(){
            const logInfo = path.join('logs', 'info.log')
            const logError = path.join('logs', 'errors.log')

            fs.writeFile(logInfo,'', (err)=>{
                if(err){console.log('Файл info не создан',err)}})
            fs.writeFile(logError,'', (err)=>{
                if(err){
                    console.log('Файл errors не создан',err)
                }
           })


        }
        setTimeout(creatDirectory,500)
    },

    writeLoggerInfo:   function (...message){

        const info = [...message]
            const logInfo = path.join('logs','info.log')
             const writeStream = fs.createWriteStream(logInfo, {encoding: 'utf8', flags: 'a'})
             const currentDate = new Date();
             const options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
             const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);

             info.forEach((item) => {
            writeStream.write(`Info: ${item}  ${formattedDate}` +'\n', (err) => {
                if (err) console.log('Error writing to stream:', err);
            });

})



    },

    writeLoggerWarn: (...message) => {
        const info = [...message];
        const logInfo = path.join('logs', 'errors.log');
        const writeStream = fs.createWriteStream(logInfo, { encoding: 'utf8', flags: 'a' });
        const currentDate = new Date();
        const options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);


            info.forEach((item) => {
                writeStream.write(`Warn: ${item}  ${formattedDate}  `+'\n', (err) => {
                    if (err) console.log('Error writing to stream:', err);
                });
            })
    },

    writeLoggerError: function(...message){
        const info = [...message];
        const logInfo = path.join('logs', 'errors.log');
        const writeStream = fs.createWriteStream(logInfo, { encoding: 'utf8', flags: 'a' });
        const currentDate = new Date();
        const options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);

              info.forEach((item) => {
                writeStream.write(`Error: ${item}  ${formattedDate}`  +'\n', (err) => {
                    if (err) console.log('Error writing to stream:', err);
                });
                     writeStream.on('error', (err) => {
                console.log('Stream error:', err);
            });
        });
    },
}


module.exports =loggerStream;