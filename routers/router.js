
const router = require('express').Router();

const users = require('../date/users.json')
const {validateUserGet:validateUserGet} = require('../validate/validate_users');
const {validateUserGetId:validateUserGetId} = require('../validate/validate_users');


router.get('/', (req, resp)=>{
  resp.status(400).send('Checking')
})

router.get('/users', (req, resp)=>{
    const param = validateUserGet(users, req.url )
    resp.status(param.status).send(param.message)
   
})

router.get('/users/:userId', (req, resp)=>{
    const param = validateUserGetId(users, (req.params.userId))
    resp.status(param.status).send(param.message)
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