const router = require('express').Router();


router.get('/', (req, resp)=>{
    resp.send(400, 'no video')
})

router.get('/users', (req, resp)=>{
    resp.send(200, 'good')
})


module.exports = {
    router
};