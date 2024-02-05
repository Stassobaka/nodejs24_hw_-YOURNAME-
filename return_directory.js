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
                    logger.error('Не найдена директория')  
                }else{
                    result.forEach((item)=>{               
                        fs.stat(path.join(directoryToDelete, item), (err, stats)=>{
                            if(err){
                                logger.error('Ошибка содержания деректории', err) 
                                }else {
                                    if(stats.isDirectory()){
                                        fs.rmdir(path.resolve(item), (err)=>{
                                            if(err){
                                                logger.warn('Директория не пустая')
                                                findFilesToDelete(directoryToDelete)
                                                console.log(path.resolve(directoryToDelete))
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
                    fs.rmdir(path.resolve(source), (err)=>{
                        if(err){
                            deleteDirectory(source) 
                        }else{
                            logger.info(`${source} удалено`)
                        }

                    })
                      
                }
                if (result.includes(target)) {
                    fs.rmdir(path.resolve(target), (err)=>{
                        if(err){
                            deleteDirectory(target) 
                        }else{
                            logger.info(`${target} удалено`)
                        }

                    })
                }else{
                    logger.info('Все папки удалены')
                }
            
            }

    })
    

}



findFilesToDelete(absoluteDirectory)
    },

    default:  function(){
   
        const files = ['E:\\nodejs24_hw_YOURNAME\\source\\.gitkeep',
        'E:\\nodejs24_hw_YOURNAME\\target\\',
        'E:\\nodejs24_hw_YOURNAME\\target\\.gitkeep',
        'E:\\nodejs24_hw_YOURNAME\\source\\subdir\\.gitkeep',
        'E:\\nodejs24_hw_YOURNAME\\source\\.file_1',
        'E:\\nodejs24_hw_YOURNAME\\source\\.file_2',
        'E:\\nodejs24_hw_YOURNAME\\source\\subdir\\.file_3',
        'E:\\nodejs24_hw_YOURNAME\\target\\.file_2',
    
    ]
        
        files.forEach((element)=>{
            fs.writeFile(element , '', (err, result)=>{
                if(err) console.log('error write file')
                if(result)console.log('Done write file')
            })
        })
       
     
}
}

module.exports = returnDefault;