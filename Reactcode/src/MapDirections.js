import React, { Component } from 'react';

var apos1,apos2,apos3,apos4;
class MapDirections extends Component {

  constructor() {
    // In a constructor, call `super` first if the className extends another className
    super();



  }

  componentWillReceiveProps(nextProps){
    apos1=nextProps.orgnlat;
    apos2=nextProps.orgnlong;
    apos3=nextProps.destlat;
    apos4=nextProps.destlong;
    console.log(apos1);
     var map = new google.maps.Map(document.getElementById('map'), {
          mapTypeControl: false,
           center: {lat: 17.3850, lng: 78.4867},
          zoom: 13,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

     var directionsService = new google.maps.DirectionsService(),
     directionsDisplay = new google.maps.DirectionsRenderer();


    var travel = {
    origin :new google.maps.LatLng(apos1, apos2) ,
    destination : new google.maps.LatLng(apos3, apos4),
    travelMode : google.maps.DirectionsTravelMode.DRIVING
    };
    // Exchanging DRIVING to WALKING above can prove quite amusing :-)

    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById("map"));
    directionsService.route(travel, function(result, status) {
    if (status === google.maps.DirectionsStatus.OK) {
    directionsDisplay.setDirections(result);
    }
  });
}


 render() {
    return (
      <div>

      <div id="map" style={{height:"422px",width:"460px"}}></div>
      </div>
    );
  }
}
export default MapDirections;
