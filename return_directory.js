const fs = require('fs');
const path = require('path');


const returnDefault = {
    clean:  function(){
        const source  = 'source';
        const target = 'target';
        const subdir = 'subdir';


const absolutePathSource = path.resolve(source);
const absolutePathTarget = path.resolve(target);
const absolutePathSubdir = path.resolve(source,subdir);


 fs.readdir(absolutePathSource,  (err, nameFile) => {
    if (err) {
        console.log('Помилка при читанні директорії:', err);
    } else {
        async function deleteFile(filePath) {
            try {
                fs.unlink(filePath, err => console.log(err));
                console.log(`Файл ${filePath} видалено успішно.`);
            } catch (err) {
                console.error(`Помилка при видаленні файлу ${filePath}:`, err);
            }
        }

        nameFile.forEach(async (file) => {
            const filePath = path.join(absolutePathSource, file);
    
            try {
                const stats = await fs.promises.stat(filePath);
    
                if (stats.isFile()) {
                    await deleteFile(filePath)
                }
            } catch (error) {
                console.error(`Помилка при отриманні інформації про файл ${filePath}:`, error);
            }
        });
    }
});

 fs.readdir(absolutePathTarget, async (err, nameFile) => {
    if (err) {
        console.log('Помилка при читанні директорії:', err);
    } else {
        async function deleteFile(filePath) {
            try {
               fs.unlink(filePath, err => console.log(err));
                console.log(`Файл ${filePath} видалено успішно.`);
            } catch (err) {
                console.error(`Помилка при видаленні файлу ${filePath}:`, err);
            }
        }

        nameFile.forEach(async (file) => {
            const filePath = path.join(absolutePathTarget, file);
    
            try {
                const stats = await fs.promises.stat(filePath);
    
                if (stats.isFile()) {
                    await deleteFile(filePath)
                }
                if (stats.isDirectory()){
                    await  deleteDirectory(filePath)
                }
            } catch (error) {
                console.error(`Помилка при отриманні інформації про файл ${filePath}:`, error);
            }
            async function deleteDirectory(directoryPath) {
                try {
                    await fs.promises.rmdir(directoryPath, { recursive: true });
                    console.log(`Директорія ${directoryPath} успішно видалена.`);
                } catch (error) {
                    console.error(`Помилка при видаленні директорії ${directoryPath}:`, error);
                }
            }
        });
    }
});

 fs.readdir(absolutePathSubdir, async (err, nameFile) => {
    if (err) {
        console.log('Помилка при читанні директорії:', err);
    } else {
        async function deleteFile(filePath) {
            try {
                fs.unlink(filePath, err => console.log(err));
                console.log(`Файл ${filePath} видалено успішно.`);
            } catch (err) {
                console.error(`Помилка при видаленні файлу ${filePath}:`, err);
            }
        }

        nameFile.forEach(async (file) => {
            const filePath = path.join(absolutePathSubdir, file);
    
            try {
                const stats = await fs.promises.stat(filePath);
    
                if (stats.isFile()) {
                    await deleteFile(filePath)
                }
            } catch (error) {
                console.error(`Помилка при отриманні інформації про файл ${filePath}:`, error);
            }
        });
    }
});
},
  

    default: async function(){
      
        const files = ['E:\\nodejs24_hw_YOURNAME\\source\\.gitkeep',
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