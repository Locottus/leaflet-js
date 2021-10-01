var OWM_API_KEY = '98674de6a91859bcea48ba07be964379';
//console.log("hola mundo!");


//main map layer
var map = L.map('map').setView([14.628434,-90.522713], 7);

//osm layer ****MAIN LAYER***
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
osm.addTo(map);


// google street 
googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
maxZoom: 20,
subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
//googleStreets.addTo(map);

var humanitarian = L.tileLayer('https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors</a> <a href="https://www.hotosm.org/" target="_blank">Tiles courtesy of Humanitarian OpenStreetMap Team</a>'
    });
    //humanitarian.addTo(map);

//*********************WEATHER TILES*************************** */
var clouds = L.OWM.clouds({opacity: 0.8, legendImagePath: 'files/NT2.png', appId: OWM_API_KEY});
var cloudscls = L.OWM.cloudsClassic({opacity: 0.5, appId: OWM_API_KEY});
var precipitation = L.OWM.precipitation( {opacity: 0.5, appId: OWM_API_KEY} );
var precipitationcls = L.OWM.precipitationClassic({opacity: 0.5, appId: OWM_API_KEY});
var rain = L.OWM.rain({opacity: 0.5, appId: OWM_API_KEY});
var raincls = L.OWM.rainClassic({opacity: 0.5, appId: OWM_API_KEY});
var snow = L.OWM.snow({opacity: 0.5, appId: OWM_API_KEY});
var pressure = L.OWM.pressure({opacity: 0.4, appId: OWM_API_KEY});
var pressurecntr = L.OWM.pressureContour({opacity: 0.5, appId: OWM_API_KEY});
var temp = L.OWM.temperature({opacity: 0.5, appId: OWM_API_KEY});
var wind = L.OWM.wind({opacity: 0.5, appId: OWM_API_KEY});

//set clickable event -->left click
map.on('click', function(e)  { 
    console.log("clicked map ",e.latlng/*.lat,e.latlng.lng*/); 

});

//set clickable event --> right click
map.on('contextmenu', function(e) {
    //alert(e.latlng);
    
    window.showAlert = function(){
        var forma = `
        
        <button type="button" class="btn btn-primary" onclick = "alert('clicked')">Primary</button>
        <button type="button" class="btn btn-secondary">Secondary</button>
        <button type="button" class="btn btn-success">Success</button>
        <button type="button" class="btn btn-danger">Danger</button>
        
        `;
        alertify.alert(forma);
    }

     window.showAlert();

});


//var layerControl = L.control.layers(baseMaps, overlayMaps, {collapsed: true}).addTo(map);


    /*==============================================
                    LAYER CONTROL
    ================================================*/
    var baseMaps = {
        "OSM": osm,
        "Google Street": googleStreets,
        "Humanitarian" : humanitarian,
        "cloudscls":cloudscls,
        "CLOUDS": clouds
    };

    L.control.layers(baseMaps).addTo(map);


console.log("end of line");