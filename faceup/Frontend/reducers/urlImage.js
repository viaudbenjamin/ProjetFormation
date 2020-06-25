export default function(url ='',action){
    if(action.type== 'saveURL'){
        var newUrl = [...url]
        newUrl.push({url:action.url})
        return newUrl
    }else{
        return url
    }
}