console.log("start of line");
var x = 0;
var y = 0;
var OWM_API_KEY = "98674de6a91859bcea48ba07be964379";

//main map layer
var map = L.map("map").setView([14.628434, -90.522713], 7);

//osm layer ****MAIN LAYER***
var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});
osm.addTo(map);

// google street
googleStreets = L.tileLayer(
  "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }
);
//googleStreets.addTo(map);

var humanitarian = L.tileLayer(
  "https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png",
  {
    maxZoom: 17,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors</a> <a href="https://www.hotosm.org/" target="_blank">Tiles courtesy of Humanitarian OpenStreetMap Team</a>',
  }
);
//humanitarian.addTo(map);

var dark = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 19,
  }
);

googleSat = L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
  maxZoom: 20,
  subdomains: ["mt0", "mt1", "mt2", "mt3"],
});

//*********************WEATHER TILES*************************** */
var clouds = L.OWM.clouds({
  opacity: 0.8,
  legendImagePath: "files/NT2.png",
  appId: OWM_API_KEY,
});
var cloudscls = L.OWM.cloudsClassic({ opacity: 0.5, appId: OWM_API_KEY });
var precipitation = L.OWM.precipitation({ opacity: 0.5, appId: OWM_API_KEY });
var precipitationcls = L.OWM.precipitationClassic({opacity: 0.5,  appId: OWM_API_KEY,}).addTo(map);
//var rain = L.OWM.rain({ opacity: 0.5, appId: OWM_API_KEY });
//var raincls = L.OWM.rainClassic({ opacity: 0.5, appId: OWM_API_KEY });
var snow = L.OWM.snow({ opacity: 0.5, appId: OWM_API_KEY });
var pressure = L.OWM.pressure({ opacity: 0.4, appId: OWM_API_KEY });
var pressurecntr = L.OWM.pressureContour({ opacity: 0.5, appId: OWM_API_KEY });
var temp = L.OWM.temperature({ opacity: 0.5, appId: OWM_API_KEY });
var wind = L.OWM.wind({ opacity: 0.5, appId: OWM_API_KEY });

/*==============================================
                    LAYER CONTROL
    ================================================*/
var baseMaps = {
  OSM: osm,
  "Google Street Map": googleStreets,
  "Humanitarian": humanitarian,
  "Mapa Obscuro": dark,
  "Google Satellite": googleSat,

  //"CLOUDS": clouds
};

var layers = {
  "Nubes clasico": cloudscls,
  //"Nuebes": clouds,
  //"Precipitacion": precipitation,
  "Precipitacion clasico": precipitationcls,
  //"Lluvia": rain,
  //"Lluvia clasico": raincls,
  //"Nieve": snow,
  "Presion": pressure,
  "Presion cntr": pressurecntr,
  "Temperatura": temp,
  "Viento": wind,
};

L.control.layers(baseMaps, layers).addTo(map);

//set clickable event -->left click
map.on("click", function (e) {
  console.log("clicked map ", e.latlng /*.lat,e.latlng.lng*/);
  this.x = e.latlng.lng;
  this.y = e.latlng.lat;

  var url =   "clima-widget.html?titulo=Clima" +   "&y=" +  this.y +  "&x=" +  this.x;
  
  console.log(url);
  myWindow = window.open(url, "", "scrollbars=1,menubar=1,resizable=1,width=500,height=300");
  myWindow.focus();

});

map.on("contextmenu", function (e) {
    console.log('RIGHT CLICK');
});


console.log("end of line");
