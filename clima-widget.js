/* WIDGET */
var OWM_API_KEY = "98674de6a91859bcea48ba07be964379";
var clima = [];
var x = 0;
var y = 0;

function graficaIconos() {
    //console.log('creando icono',daily);
    var dia = false;
    var icon = 'fa-sun';
    var colorIcon = 'black';
  
    var d = new Date();
    //fecha = d.toString();
    hora = d.getHours();
  
    var ld = ''
    //for (var i = 0; i < daily.length; i++) 
    {
      if (hora > 5 && hora < 19) {
        dia = true;
        //colorIcon = 'orange';
  
        if (this.clima["weather"][0].description.indexOf("clar") > -1)
          icon = 'fa-sun';
        if (this.clima["weather"][0].description.indexOf("nub") > -1)
          icon = 'fa-cloud-sun';
        if (this.clima["weather"][0].description.indexOf("lluvi") > -1)
          icon = 'fa-cloud-sun-rain';
      }
  
      else {
        dia = false;
        //colorIcon = 'steelblue';
        icon = 'fa-moon'
        if (this.clima["weather"][0].description.indexOf("nub") > -1)
          icon = 'fa-cloud-moon';
        if (this.clima["weather"][0].description.indexOf("lluvi") > -1)
          icon = 'fa-cloud-moon-rain';
  
      }
      var colTemplate = `  
        <i  class="fas fa-4x fa-align-center ${icon}" style="color:${colorIcon}"></i>
       `;
      //console.log(colTemplate);
      ld = ld + colTemplate;
    }
    document.getElementById("iconosClima").innerHTML = ld;
  
    //var clima = this.dataClima;
    console.log(this.clima);
    document.getElementById("name").innerHTML = ' ' + this.clima["name"].toUpperCase();
    document.getElementById("temp").innerHTML = ' ' + this.clima["main"].feels_like + '℃';
    document.getElementById("descripcion").innerHTML = ' ' + this.clima["weather"][0].description;
    document.getElementById("humedad").innerHTML = ' ' + this.clima["main"].humidity + '%';
    document.getElementById("maxTemp").innerHTML = ' ' + this.clima["main"].temp_max + '℃';
    document.getElementById("minTemp").innerHTML = ' ' + this.clima["main"].temp_min + '℃';
    document.getElementById("viento").innerHTML = ' ' + this.clima["wind"].speed + 'm/s';
    document.getElementById("nubes").innerHTML = ' ' + this.clima["clouds"].all + '%';
  
    document.getElementById("latitud").innerHTML = this.y;
    document.getElementById("longitud").innerHTML = this.x;
  }
  
  
  async function getWeather() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.y = urlParams.get("y");
    this.x = urlParams.get("x");
  
  
    var url = 'https://api.openweathermap.org/data/2.5/weather?APPID=' + OWM_API_KEY + '&lat=' + this.y + '&lon=' + this.x + '&lang=sp&units=metric';
    console.log(url);
  
    var res = await fetch(url);
    this.clima = await res.json();
  
    console.log(this.y, this.x);
    graficaIconos();
  
    
  }
  
  function abrirPronosticoWidget() {
    var url =
      "clima.html?titulo=Clima" +
      "&y=" +
      this.y +
      "&x=" +
      this.x;
    console.log(url);
    myWindow = window.open(url, "", "scrollbars=1");
    myWindow.focus();
  
  }