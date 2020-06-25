export default function (token = '',action){
    if(action.type=='stock'){
        var newToken = action.token
        return newToken
    }else {
        return token
    }
}