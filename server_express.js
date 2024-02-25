const morgan = require('morgan')
const express = require('express');
const {router:userStatus} = require('./routers/router')
const srv = express();
const jsonBodyParser = express.json();


srv.use(jsonBodyParser)

srv.listen(3000, ()=>console.log('Server express running'))

srv.use(morgan(`Метод: :method\nUrl: :url\nStatus: :status`))
srv.use(morgan('dev'));

srv.use(userStatus);

// process.on('exit', (code) => {
//     console.log('Событие exit сработало с кодом:', code);
//     // Ваш код, который нужно выполнить перед завершением процесса
//   });
