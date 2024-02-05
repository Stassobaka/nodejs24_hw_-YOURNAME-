const fs = require('fs');
const path = require('path');
const logger = require('./utils/logger')('main');


const returnDefault = {
    clean:  function(){
        const source  = 'source';
        const target = 'target';
        const absoluteDirectory = '.'
const absolutePathSource = path.resolve(source);
const absolutePathTarget = path.resolve(target);

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
                                logger.error('Ошибка содержания деректории', err) 
                                }else {
                                    if(stats.isDirectory()){
                                        fs.rmdir(item, (err)=>{
                                            if(err){
                                                logger.warn('Директория не пустая')
                                                   deleteDirectory( path.join(directoryToDelete, item))
                                                   findFilesToDelete(absoluteDirectory)
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
                }else{
                    logger.info('Все папки удалены')
                }
            
            }

    })
    

}

findFilesToDelete(absoluteDirectory)
    },

    default:  function(){
   
        fs.mkdir(path.join('.', 'source'), (err)=>{
            if(err){
                logger.warn(`Не удалось создать папку ${path.join('.', 'source')} или она уже существует `)
            }else{
                logger.info(`${path.join('.', 'source')} папка создана`)
                fs.writeFile()
            }
        })
        fs.mkdir(path.join('.', 'target'), (err)=>{
            if(err){
                logger.warn(`Не удалось создать папку ${path.join('.', 'target')} или она уже существует `)
            }else{
                logger.info(`${path.join('.', 'target')} папка создана`)
            }
        })
        fs.mkdir(path.join('.', 'source', 'subdir'), (err)=>{
            if(err){
                logger.warn(`Не удалось создать папку ${path.join('.', 'source', 'subdir')} или она уже существует `)
            }else{
                logger.info(`${path.join('.', 'source', 'subdir')} папка создана`)
            }
        })




}
}

module.exports = returnDefault;