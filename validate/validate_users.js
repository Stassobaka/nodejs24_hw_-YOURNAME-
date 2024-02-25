const yup = require('yup');
let newUserList =[];



function validateUserGet(items, url){
if(url === '/users'){
    return {
        status: 200,
        message: "All users"
    }
}
}


function validateUserGetId(items, id){

    const parsedId = parseFloat(id)

    if(parsedId > 0 &&  Number.isInteger(parsedId)){
        const foundUser = items.find(item => item.userId === id )
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

async function validateUserPost(item, newUser) {
    const userCheck = yup.object().shape({
        username: yup.string().required('Username is required'),
        email: yup.string().email('Invalid email format').required('Email is required'),
    });

    try {
        await userCheck.validate(newUser, { abortEarly: false });
        if(newUserList.length === 0){
            newUser.userId = 1,
            newUserList.push(newUser);
            
        }else{
            let maxId = -1;

            for( let i = 0; i < newUserList.length; i++){
                if (newUserList[i].userId > maxId){
                    maxId =newUserList[i].userId
                    console.log(maxId)
                }  
                      
            }
            newUser.userId = maxId + 1, 
            newUserList.push(newUser);
            console.log(newUserList);
        
        }
       
        return {
            status: 200,
            message: "Add user"
        };
    } catch (error) {
        return {
            status: 400,
            message: error.errors.join(', ')
        };
    }
    
}


function validateUserDelete(id) {
    const parsedId = parseFloat(id)
    
    if(parsedId > 0 &&  Number.isInteger(parsedId)){

            const foundUser = newUserList.find(item => item.userId === parsedId)
            console.log(foundUser)
            if(foundUser){
                newUserList = newUserList.filter(item => item.userId !== parsedId)
                console.log(newUserList);
                
                return{
                    status: 200,
                    message:`Delete userID: ${id} ` ,
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
    validateUserGetId,
    validateUserPost,
    validateUserDelete,
    newUserList
} 

