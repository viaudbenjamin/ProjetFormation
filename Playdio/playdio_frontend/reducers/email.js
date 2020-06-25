export default function(email ='',action){
    if(action.type== 'saveEmailUser'){
        var newEmail = action.email
        return newEmail
    }else{
        return email
    }
}