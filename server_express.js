const morgan = require('morgan')
const express = require('express');
const {router:userStatus} = require('./routers/router')
const srv = express();
const jsonBodyParser = express.json();
const {writeJsonUser:writeJsonUser} = require('./validate/validate_users');


srv.use(jsonBodyParser)

server = srv.listen(3000, ()=>console.log('Server express running'))

srv.use(morgan(`Метод: :method\nUrl: :url\nStatus: :status`))
srv.use(morgan('dev'));

srv.use(userStatus);


srv.post('/shutdown', (req, res) => {
  writeJsonUser();
  console.log('Остановка сервера по запросу...');
  res.send('Сервер останавливается...');
  server.close(() => {
      console.log('Сервер успешно остановлен.');
      process.exit(0); // Для завершения процесса Node.js
  });
});