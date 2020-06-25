export default function (info = [], action){
    if(action.type=='add'){
        var newInfo = [...info]
        newInfo = newInfo.filter(elem=>elem.article.title!=action.title)
        newInfo.push({article:action.article})
        console.log(1,newInfo)
        return newInfo;
    }else if(action.type=='suppr'){
        var newInfo = [...info]
        newInfo = newInfo.filter(elem=>elem.article.title!=action.indice)
        console.log(2,newInfo)
        return newInfo
    }else {

        return info
    }
}