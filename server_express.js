const morgan = require('morgan')
const express = require('express');
const {router:userStatus} = require('./routers/router')
const srv = express();
const jsonBodyParser = express.json();


srv.use(jsonBodyParser)

srv.listen(3000, ()=>console.log('Server express running'))

srv.use(morgan(`Метод: :method\nUrl: :url\nStatus: :status`))

srv.use(userStatus)
