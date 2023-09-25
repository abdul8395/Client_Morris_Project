var map
var osm_street   = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
    googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
                    maxZoom: 20,
                    subdomains:['mt0','mt1','mt2','mt3']
                });


 map = L.map('map', {
  center: [41.30967862979352, -100.10742187500001],
  zoom: 4,
  attributionControl: false
});
var googlestreet   = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
    })
   var dark  = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png').addTo(map);
    map.zoomControl.setPosition('bottomright');


    var geocoder=L.Control.geocoder({
      // defaultMarkGeocode: false,
        collapsed:false,
        position:"topright", 
        placeholder:"Search Any Address and press Enter...",
        queryParams: {"countrycodes": "US"},
        geocoder: new L.Control.Geocoder.Nominatim({
        geocodingQueryParams: {
            "countrycodes": "US"
            }
        })
      })
      geocoder.addTo(map);






// $('#legenddiv').css('visibility','hidden');



var lyrDCI_2015_2019=L.esri.featureLayer({
         url: 'https://services.arcgis.com/UbyviKPk0x1UemzF/arcgis/rest/services/DCI_2015_2019_Population/FeatureServer/0',
         opacity: 0.7,
         style: (feature) => {
             let style = {
                 fillColor: "#90e69a",
                 weight: 0.3,
                 opacity: 1,
                 color:"black",
                 dashArray: '2',
                 fillOpacity: 0.8
             };
             return style;
         }
     });

var lyrCounty_Subdivisions_v1=L.esri.featureLayer({
         url: 'https://services2.arcgis.com/FiaPA4ga0iQKduv3/arcgis/rest/services/County_Subdivisions_v1/FeatureServer/0',
         opacity: 0.7,
         style: (feature) => {
             let style = {
                 fillColor: "#1db02e",
                 weight: 0.3,
                 opacity: 1,
                 color:"black",
                 dashArray: '2',
                 fillOpacity: 0.8
             };
             return style;
         }
     });

var lyrusa_november_2022=L.esri.featureLayer({
         url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/usa_november_2022/FeatureServer/0',
         opacity: 0.7,
         style: (feature) => {
             let style = {
                 fillColor: "#9bb8e3",
                 weight: 0.3,
                 opacity: 1,
                 color:"black",
                 dashArray: '2',
                 fillOpacity: 0.8
             };
             return style;
         }
     });
var Alaska_Native_Village=L.esri.featureLayer({
         url: 'https://services2.arcgis.com/FiaPA4ga0iQKduv3/arcgis/rest/services/Alaska_Native_Village_Statistical_Areas_v1/FeatureServer/0',
         opacity: 0.7,
         style: (feature) => {
             let style = {
                 fillColor: "#bc74e3",
                 weight: 0.3,
                 opacity: 1,
                 color:"black",
                 dashArray: '2',
                 fillOpacity: 0.8
             };
             return style;
         }
     });

// layer 2


var CT_Coal_Closures_April2023_2=L.esri.featureLayer({
  url: 'https://arcgis.netl.doe.gov/server/rest/services/Hosted/CT_Coal_Closures_April2023_2/FeatureServer/23',
  opacity: 0.7,
  style: (feature) => {
      let style = {
          fillColor: "#ffa340",
          weight: 0.3,
          opacity: 1,
          color:"black",
          dashArray: '2',
          fillOpacity: 0.8
      };
      return style;
  }
});

var MSAnMSA_EnergyComm=L.esri.featureLayer({
  url: 'https://arcgis.netl.doe.gov/server/rest/services/Hosted/MSAnMSA_EnergyComm/FeatureServer/17',
  opacity: 0.7,
  style: (feature) => {
      let style = {
          fillColor: "#49331c",
          weight: 0.3,
          opacity: 1,
          color:"black",
          dashArray: '2',
          fillOpacity: 0.8
      };
      return style;
  }
});


var Eligibility_dynlyr=L.esri.dynamicMapLayer({
  url: "https://rdgdwe.sc.egov.usda.gov/arcgis/rest/services/Eligibility/Eligibility/MapServer",
  opacity: 0.7
}).addTo(map);









// var baseLayers = {
//   "Google Street": googlestreet,
//   "Google Satellite": googleSat,
//   "OSM (Openstreetmap)": osm_street,
//   "Dark MAP": dark,
// };
// var overLays = {
  // '<i class="fa-solid fa-square fa-lg" style="color: #be1313;"></i> CT_Coal_Closures_April2023': CT_Coal_Closures_April2023,
  // "Trees & Graphics": trees_layer,
  // "Clouds": clouds_layer
  // };
// var mylayercontrol= L.control.layers(baseLayers,overLays,{collapsed:false}).addTo(map);
// L.control.layers(baseLayers).addTo(map);


const overlays = [
  {name: 'Google Street', layer: googlestreet},
  {name: 'Google Satellite', layer: googleSat},
  {name: 'OSM (Openstreetmap)', layer: osm_street},
  {name: 'Dark MAP', layer: dark}
];

const legend = L.multiControl(overlays, {position:'topright', label: '<b style="font-size: 15px;">Base MAP Layers</b>'}).addTo(map);





//-----------add remove geojson----------  
function addRemoveLayer(name){
  if(name=='lyrDCI_2015_2019'){
      var ckb = $("#lyrDCI_2015_2019").is(':checked');
      if(ckb==true){
          map.addLayer(lyrDCI_2015_2019)
      }else{
            map.removeLayer(lyrDCI_2015_2019)
      }
  }
  if(name=='lyrCounty_Subdivisions_v1'){
      var ckb = $("#lyrCounty_Subdivisions_v1").is(':checked');
      if(ckb==true){
          map.addLayer(lyrCounty_Subdivisions_v1)
      }else{
            map.removeLayer(lyrCounty_Subdivisions_v1)
      }
  }
  if(name=='lyrusa_november_2022'){
      var ckb = $("#lyrusa_november_2022").is(':checked');
      if(ckb==true){
          map.addLayer(lyrusa_november_2022)
      }else{
            map.removeLayer(lyrusa_november_2022)
      }
  }
  if(name=='Alaska_Native_Village'){
      var ckb = $("#Alaska_Native_Village").is(':checked');
      if(ckb==true){
          map.addLayer(Alaska_Native_Village)
      }else{
            map.removeLayer(Alaska_Native_Village)
      }
  }
  if(name=='CT_Coal_Closures_April2023_2'){
      var ckb = $("#CT_Coal_Closures_April2023_2").is(':checked');
      if(ckb==true){
          map.addLayer(CT_Coal_Closures_April2023_2)
      }else{
            map.removeLayer(CT_Coal_Closures_April2023_2)
      }
  }
  if(name=='MSAnMSA_EnergyComm'){
      var ckb = $("#MSAnMSA_EnergyComm").is(':checked');
      if(ckb==true){
          map.addLayer(MSAnMSA_EnergyComm)
      }else{
            map.removeLayer(MSAnMSA_EnergyComm)
      }
  }
  if(name=='Eligibility_dynlyr'){
      var ckb = $("#Eligibility_dynlyr").is(':checked');
      if(ckb==true){
          map.addLayer(Eligibility_dynlyr)
      }else{
            map.removeLayer(Eligibility_dynlyr)
      }
  }
 


}







$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});


$("#legend-btn").click(function() {
  $("#legendModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#login-btn").click(function() {
  $("#loginModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#list-btn").click(function() {
  animateSidebar();
  return false;
});

$("#nav-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

$("#sidebar-toggle-btn").click(function() {
  animateSidebar();
  return false;
});

$("#sidebar-hide-btn").click(function() {
  animateSidebar();
  return false;
});

function animateSidebar() {
  $("#sidebar").animate({
    width: "toggle"
  }, 350, function() {
    map.invalidateSize();
  });
}

function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}

function clearHighlight() {
  highlight.clearLayers();
}

function sidebarClick(id) {
  var layer = markerClusters.getLayer(id);
  map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
  layer.fire("click");
  /* Hide sidebar and go to the map on small screens */
  if (document.body.clientWidth <= 767) {
    $("#sidebar").hide();
    map.invalidateSize();
  }
}

