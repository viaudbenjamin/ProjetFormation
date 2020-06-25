export default function(attributeFacial =[],action){
    if(action.type== 'saveAttributeFacial'){
        var newAttributeFacial = [...attributeFacial]
        newAttributeFacial.push({age:action.age,barbe:action.barbe,gender:action.gender,haircolor:action.haircolor,lunette:action.lunette,sourir:action.sourir})
        return newAttributeFacial
    }else{
        return attributeFacial
    }
}