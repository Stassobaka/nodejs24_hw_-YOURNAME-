function validateUserGet(items, url){
if(url === '/users'){
    return {
        status: items,
        message: "All users"
    }
}
}


function validateUserGetId(items, id){
    const parsedId = parseFloat(id)
    console.log(parsedId > 0 &&  Number.isInteger(parsedId))
    if(parsedId > 0 &&  Number.isInteger(parsedId)){
        const foundUser = items.find(item => item.userId === id )
        console.log(foundUser)
        if(foundUser){
            return{
                status: 200,
                message: foundUser,
            }

        }else{
            return{
                status: 404,
                message: 'Not found user',
            }

        }
        
    }else{
        return{
            status: 400,
            message: 'Error.The id must be greater than zero or an integer.',
        }
    }



}
module.exports ={
    validateUserGet,
    validateUserGetId
} 