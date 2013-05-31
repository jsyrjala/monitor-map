
var monitorUrl = "monitor-status.json";

var helsinki = [65.1708, 24.9375];
var nuorgam = [70.0806, 27.8750];
var vaasa = [63.1000, 21.6167];
var ilomantsi = [62.6722, 30.9306];



var map = L.map('map');

console.log("start");

L.tileLayer("http://tiles.kartat.kapsi.fi/taustakartta/{z}/{x}/{y}.jpg", {
    attribution: 'Maanmittauslaitos',
    maxZoom: 18
}).addTo(map);


map.fitBounds([helsinki, nuorgam, vaasa, ilomantsi]);
var locations = [];

function drawLocations() {

}
var markers = L.layerGroup([]);
markers.addTo(map);



var greenIcon = L.icon({iconUrl: 'img/green.png',
                        iconAnchor: [17, 43],
                        popupAnchor: [0, -40]});
var orangeIcon = L.icon({iconUrl: 'img/orange.png',
                        iconAnchor: [17, 43],
                        popupAnchor: [0, -40]});
var redIcon = L.icon({iconUrl: 'img/red.png',
                        iconAnchor: [17, 43],
                        popupAnchor: [0, -40]});

function getIcon(loc) {
  if(loc.status == "normal") {
    return greenIcon;
  } else if(loc.status == "warn")  {
    return orangeIcon;
  }

    return redIcon;
}
function readLocations(data) {
  markers.clearLayers();
  for (var i in data.locations) {
    var loc = data.locations[i];
    var marker = L.marker([loc.latitude, loc.longitude], {icon: getIcon(loc)}).
      bindPopup('<strong>' + (loc.name || "") + '</strong><br />' + (loc.message || ""));
    marker.addTo(markers);
  }
};

function reloadLocations() {
  console.log("reloading");
  $.getJSON(monitorUrl, readLocations).error(function(e) {console.log("malformed json data");});
}

reloadLocations();
setInterval(reloadLocations, 10000);
