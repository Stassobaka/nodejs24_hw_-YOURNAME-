
const router = require('express').Router();


const {validateUserGet:validateUserGet} = require('../validate/validate_users');
const {validateUserGetId:validateUserGetId} = require('../validate/validate_users');
const {validateUserPost:validateUserPost} = require('../validate/validate_users');
const {validateUserDelete:validateUserDelete} = require('../validate/validate_users');

router.get('/', (req, resp)=>{
  resp.status(400).send('Checking')
})

router.get('/users', (req, resp)=>{
    const param = validateUserGet( req.url )
    resp.status(param.status).send(param.message)
   
})

router.get('/users/:userId', (req, resp)=>{
    const param = validateUserGetId( (req.params.userId))
    resp.status(param.status).send(param.message)
})


router.post('/users', async (req, resp, next) => {
    try {
        const param = await validateUserPost( req.body);
        resp.status(param.status).send(param.message);
        next()
    } catch (error) {
        resp.status(500).send('Internal Server Error');
    }
});

router.delete( '/users/:userId', (req, resp)=>{

    const param = validateUserDelete((req.params.userId))
    resp.status(param.status).send(param.message)

    
})


module.exports = {
    router
};