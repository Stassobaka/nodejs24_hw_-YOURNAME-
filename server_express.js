const morgan = require('morgan');
const express = require('express');

const { router: userStatus } = require('./routers/router');
const { writeJsonUser: writeJsonUser } = require('./controllers/users_controller');

const srv = express();
const jsonBodyParser = express.json();

srv.use(jsonBodyParser);

server = srv.listen(3000, () => console.log('Server express running'));

srv.use(morgan(`Метод: :method\nUrl: :url\nStatus: :status`));
srv.use(morgan('dev'));

srv.use(userStatus);

//! оце взагалі топ ідея - спеціальний ендпоінт щоб попросити сервер виключитись
srv.post('/shutdown', (req, res) => {
  writeJsonUser();
  console.log('Остановка сервера по запросу...');
  res.send('Сервер останавливается...');
  server.close(() => {
    console.log('Сервер успешно остановлен.');
    process.exit(0); // Для завершения процесса Node.js
  });
});
