export default function(deleteUser ='',action){
    if(action.type== 'delete'){
        var newdeleteUser = action.delUser
        return newdeleteUser
    }else{
        return deleteUser
    }
}