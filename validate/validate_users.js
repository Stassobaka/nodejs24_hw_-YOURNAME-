function validateUser(items, url){
if(items.length === 0 & url === '/users'){
    return {
        'status': 404,
        'message': 'Not found users'
    }
} 
if(url === '/users' & items.length > 0){
    return {
        'status': 200,
        'message': items
    }
}



}

module.exports = validateUser