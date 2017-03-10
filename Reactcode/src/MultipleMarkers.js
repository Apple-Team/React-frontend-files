import React, { Component } from 'react';
class MultipleMarkers extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another className
    super();
     this.state = { data:[]};


  }
componentWillReceiveProps(nextProps){
    var that=this;
    fetch("http://localhost:9000/collections/"+nextProps.name)
            .then((response) => response.json())
            .then((responseJson) => {
               that.setState({
                data: responseJson

               });
            }).then(function(e){

 var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: new google.maps.LatLng(that.state.data[0].latitude, that.state.data[0].longitude)
    });

  for (var i = 0, length = that.state.data.length; i < length; i++) {
    var data1 = that.state.data[i],
      latLng = new google.maps.LatLng(data1.latitude, data1.longitude);

  // Creating a marker and putting it on the map
   var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    title:data1.name

  });
  var content='<div>'+
            '<h1 id="firstHeading" class="firstHeading">data1.name</h1>'+
            '<div id="bodyContent">'+
            '<p>data1.cuisine</p>' +
            '<p>data1.address</p>'+'</div>'+'</div>';
// Adding a new info window for the object
    var clicker = addClicker(marker, data1.name);

   function addClicker(marker, content) {
    google.maps.event.addListener(marker, 'click', function() {

      if (infowindow) {infowindow.close();}
       var infowindow = new google.maps.InfoWindow({content: content});
      infowindow.open(map, marker);

    });
  }

      console.log(data1.name);
 }
  console.log(latLng);
  console.log(data1);

});

  }

  render() {
    return (
      <div>
        <div id="map" style={{height:"640px",width:"1120px"}}></div>
      </div>
    );
  }
}
export default MultipleMarkers;
