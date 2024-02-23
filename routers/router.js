
const router = require('express').Router();
const validateUser = require('../validate/validate_users');
const users = require('../date/users.json')


router.get('/', (req, resp)=>{
  resp.status(400).send('Checking')
})

router.get('/users', (req, resp)=>{
    const param = validateUser(users, '/users' )
    resp.status(param.status).send(param.message)
   
})

router.get('/users/:userId', (req, resp)=>{
    resp.status(400).send('Good job')
})


router.post('/users', (req, resp)=>{
validateUser(req.body)
    resp.status(400).send(validateUser(req.body))
})

router.delete('/users/:userId ', (req, resp)=>{
    resp.status(400).send('Good job')
})


module.exports = {
    router
};