var error = document.getElementById('error')
var passPris = document.getElementById('passPris')
var attr = passPris.getAttribute('name')
var mauvaisPass = document.getElementById('mauvaisPass')
var attr2 = mauvaisPass.getAttribute('name')

if(attr==='true'){
    var creatP = document.createElement('p');
        creatP.style.color = "red";
        creatP.style.fontStyle= "italic";
        creatP.style.marginLeft= "5px";
        creatP.textContent = "Veillez renseigner un autre mot de passe "
        error.appendChild(creatP)
}

if(attr2==='true'){
    var creatP = document.createElement('p');
        creatP.style.color = "red";
        creatP.style.fontStyle= "italic";
        creatP.style.marginLeft= "5px";
        creatP.textContent = "Mauvais mos de passe "
        error.appendChild(creatP)
}