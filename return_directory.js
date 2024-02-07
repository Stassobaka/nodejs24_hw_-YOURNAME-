const fs = require('fs');
const path = require('path');
const logger = require('./utils/logger')('main');


const returnDefault = {
    clean:  function(){
        const source  = 'source';
        const target = 'target';
        const absoluteDirectory = '.'

function deleteDirectory(directoryToDelete){
    fs.rmdir(directoryToDelete,(err, result)=>{
        
        if(result){
            logger.info(`Директория ${directoryToDelete} удалена`)
        }
        if(err){
            fs.readdir(directoryToDelete, (err, result)=>{
                if(err){
                    findFilesToDelete(absoluteDirectory)
                }else{
                    result.forEach((item)=>{  

                            fs.stat(path.join(directoryToDelete, item) , (err, stats)=>{
                                if(err){
                                    logger.warn('Отсутствует директория', err.path) 
                                    }else {
                                        if(stats.isDirectory()){
                                            fs.rmdir(item, (err)=>{
                                                if(err){                                              
                                                       deleteDirectory( path.join(directoryToDelete, item))
                                                }else{
                                                    logger.info(`Директория ${path.resolve(item)}`)
                                                }
                                            })
                                        }
                                        if(stats.isFile()){
                                            fs.unlink(path.join(directoryToDelete, item), (err)=>{
                                                if(err){
                                                    logger.error(`Не удалось удалить файл ${path.resolve(item)}`)
                                                }else{
                                                    logger.info(`Файл ${path.resolve(item)} удален`)
                                                    deleteDirectory(path.join(directoryToDelete, item))
                                                }
                                            })
                                        }
                                            
                                        
                                    }
                                })
                        

                        })
                        
                    }
                })

        }

    })
 }



function findFilesToDelete(directory){
    
        fs.readdir(directory, (err, result)=>{
            if(err){
                logger.error('Не найдена директория')
            }else{
                if (result.includes(source)) {
                    deleteDirectory(source)  
                }
                if (result.includes(target)) {
                    deleteDirectory(target) 
                }          
            }

    })
    

}

findFilesToDelete(absoluteDirectory)
    },

    default:  function(){
   


        function addDirectory(){
            fs.mkdir(path.join('.', 'source'), (err)=>{
                if(err){
                    logger.warn(`Не удалось создать папку ${path.join('.', 'source')} или она уже существует `)
                }else{
                    logger.info(`${path.join('.', 'source')} папка создана`)
                }
            })
            fs.mkdir(path.join('.', 'target'), (err)=>{
                if(err){
                    logger.warn(`Не удалось создать папку ${path.join('.', 'target')} или она уже существует `)
                }else{
                    logger.info(`${path.join('.', 'target')} папка создана`)
                }
            })
            let subdir = path.join('.', 'source', 'subdir')
            fs.mkdir(subdir , (err)=>{
                if(err){
                    logger.warn(`Не удалось создать папку ${path.join('.', 'source', 'subdir')} или она уже существует `)
                }else{
                    logger.info(`${path.join('.', 'source', 'subdir')} папка создана`)
                }
            })
            addFile()
        }

       function addFile(){
        fs.readdir('.', (err, result)=>{
            if(err){
                logger.error(' Не удалось прочитать дерево')
            }else{
                logger.info(result)

                result.forEach((item)=>{
                    if(item === 'source'){
                        let file_1 = path.join('source', 'file_1' )
                        let file_2 = path.join('source', 'file_2' )
                        let file_3 = path.join('source', 'subdir', 'file_3' )
                        
                        fs.writeFile(file_1, '', (err)=>{
                            if(err){
                                logger.error(`Файл ${file_1} не записан`)
                            }else{
                                logger.info(`Файл file_1 записан в папку ${file_1}`)
                            }                           
                        })
                        
                        fs.writeFile(file_2, '', (err)=>{
                            if(err){
                                logger.error(`Файл ${file_2} не записан`)
                            }else{
                                logger.info(`Файл file_3 записан в папку ${file_2}`)
                            }                           
                        })

                        fs.writeFile(file_3, '', (err)=>{
                            if(err){
                                logger.error(`Файл ${file_3} не записан`)
                            }else{
                                logger.info(`Файл file_2 записан в папку ${file_3}`)
                            }                           
                        })

                    }
                    if(item === 'target'){
                        let file_2 = path.join('target', 'file_2' )
                        fs.writeFile(file_2, '', (err)=>{
                            if(err){
                                logger.error(`Файл ${file_2} не записан`)
                            }else{
                                logger.info(`Файл file_2 записан в папку ${file_2}`)
                            }                           
                        })                   
                    }
                })
            }
        })

       }
        


addDirectory();


}
}

module.exports = returnDefault;