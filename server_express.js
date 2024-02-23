const morgan = require('morgan')
const express = require('express');
const {router:userStatus} = require('./routers/router')
const srv = express();

srv.listen(3000, ()=>console.log('Server express running'))

srv.use(morgan(':method :url :status'))

srv.use('/', userStatus)
