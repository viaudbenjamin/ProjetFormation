/* Creation des messages d'erreurs */

var indice = document.getElementById('indice')
var test = document.getElementById('test')
var attr = test.getAttribute('name')
var existe = document.getElementById('existe')
var attr2 = existe.getAttribute('name')

if(indice===null){
    var alertMessage = document.getElementById('alertMessage')
    var createDiv = document.createElement('div');
        alertMessage.appendChild(createDiv);
    var creatP = document.createElement('p');
        creatP.style.color = "red";
        creatP.style.fontStyle= "italic";
        creatP.style.marginLeft= "5px";
        creatP.textContent = "veillez selectionner une ville"
        createDiv.appendChild(creatP)
}

if(attr==='true'){
    var creatP = document.createElement('p');
        creatP.style.color = "red";
        creatP.style.fontStyle= "italic";
        creatP.style.marginLeft= "5px";
        creatP.textContent = "La ville est deja affiché "
        test.appendChild(creatP)
}
if(attr2==='true'){
    var creatP = document.createElement('p');
        creatP.style.color = "red";
        creatP.style.fontStyle= "italic";
        creatP.style.marginLeft= "5px";
        creatP.textContent = "La ville n'existe pas "
        test.appendChild(creatP)
}

/* mise en place de la map */
var mymap = L.map('mapid').setView([48.866667, 2.333333], 13);
var longitude = document.getElementsByClassName('longitude');
var latitude = document.getElementsByClassName('latitude'); 

var longitudeInfo = []
var latitudeInfo = []

for(var i=0; i<longitude.length;i++){
    
    longitudeInfo.push(longitude[i].dataset.longitude)
    latitudeInfo.push(latitude[i].dataset.latitude)
}

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoia2FyYW50YXNzIiwiYSI6ImNrOWUwOGZzOTA4Y2kzbHMwMmpreXh4MTQifQ.tlkWMUEj75dklkDUcxf2rw'
}).addTo(mymap)

var customIcon = L.icon({
    iconUrl: '../images/leaf-green.png',
    shadowUrl: '../images/leaf-shadow.png',
    
    iconSize:   [38, 95],
    shadowSize:  [50, 64],
    
    iconAnchor:  [22, 94],
    shadowAnchor: [4, 62],  
    
    popupAnchor: [-3, -76]
    });

for(var i=0;i<longitudeInfo.length;i++){
var marker = L.marker([latitudeInfo[i],longitudeInfo[i]],{icon: customIcon}).addTo(mymap)
}

