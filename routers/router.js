
const router = require('express').Router();
const validateUser = require('../validate/validate_users')


router.get('/', (req, resp)=>{
    resp.status(400).send('Good job')
})

router.get('/users', (req, resp)=>{
    resp.status(400).send('Good job')
})

router.get('/users/:userId', (req, resp)=>{
    resp.status(400).send('Good job')
})


router.post('/users', (req, resp)=>{
validateUser(req.body)
    resp.status(400).send('Good job')
})

router.delete('/users/:userId ', (req, resp)=>{
    resp.status(400).send('Good job')
})


module.exports = {
    router
};