const fs = require('fs');
const path = require('path');
const loggerStream = {



    writeStream: function (...message){
        const info = [...message]
     
        function creatDirectory(){
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

}

}





module.exports =loggerStream;