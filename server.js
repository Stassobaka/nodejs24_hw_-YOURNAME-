const http = require('http')
const logger = require('./utils/logger')('main');

const server = http.createServer();

server.listen(3000);
// Создали сервер 





server.on('request', (req, resp) =>{
    if(req.url === '/healthcheck' && req.method === 'GET'){
        resp.writeHead(200, 'OK')
        resp.write('healthcheck passed')
        logger.info(`${req.method} ${req.url} 200`)
        resp.end()
    }
    
   
   
})