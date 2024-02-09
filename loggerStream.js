const fs = require('fs');
const path = require('path');
const {Writable} = require('stream')


const loggerStream = {


    creatDirectory: function (){
   
     
       function  creatDirectory(){
            fs.readdir('.', (err, result)=>{
                console.log(result)
                if(err){
                    console.log('error')
                }else{
                    if(!result.includes('logs')){
                        fs.mkdir('logs' ,(err)=>{
                            if(err){
                                console.log('Директория Logs не создана',err)
                            }else{
                                createFile()
                            }})             
                        
                    }else{
                        console.log(`Директория ${path.resolve('logs')} существует `)
                        createFile()
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


creatDirectory()


    },

    writeLoggerInfo:function(...message){


        
        const info = [...message]
            const logInfo = path.join('logs','info.log')
            const writeStream = fs.createWriteStream(logInfo, {encoding: 'utf8', flags: 'a'})
            writeStream.on('open', () => {
        info.forEach((item) => {
            console.log(item);
            writeStream.write('Info:' + item + '\n', (err) => {
                if (err) console.log('Error writing to stream:', err);
            });
        });
        writeStream.on('close', () => {
            console.log('Stream closed');
        });
        writeStream.end();
        writeStream.on('error', (err) => {
            console.log('Stream error:', err);
        });
        
})
       


    },

    writeLoggerWarn: (...message) => {
        const info = [...message];
        const logInfo = path.join('logs', 'errors.log');
        const writeStream = fs.createWriteStream(logInfo, { encoding: 'utf8', flags: 'a' });
        writeStream.on('open', () => {
            info.forEach((item) => {
                console.log(item);
                writeStream.write('warn:' + item + '\n', (err) => {
                    if (err) console.log('Error writing to stream:', err);
                });
            });
            writeStream.end();

        });

        writeStream.on('error', (err) => {
            console.log('Stream error:', err);
        });

    },

    writeLoggerError: function(...message){
        const info = [...message];
        const logInfo = path.join('logs', 'errors.log');
        
        const writeStream = fs.createWriteStream(logInfo, { encoding: 'utf8', flags: 'a' });
 
        writeStream.on('open', () => {
            info.forEach((item) => {
                console.log(item);
                writeStream.write('Error:' + item + '\n', (err) => {
                    if (err) console.log('Error writing to stream:', err);
                });
            });
            writeStream.end();
            writeStream.on('error', (err) => {
                console.log('Stream error:', err);
            });
        });
    },
}


module.exports =loggerStream;