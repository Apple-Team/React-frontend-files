import React, { Component } from 'react';
import "./Maps.css";
class StaticMap extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another className
    super();
    this.handleMap = this.handleMap.bind(this);


  }
 handleMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 17.3850, lng: 78.4867},
          zoom: 13,
          panControl:true,
         zoomControl:true,
         mapTypeControl:true,
         scaleControl:true,
         streetViewControl:true,
         overviewMapControl:true,
         rotateControl:true
        });


        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));
            var lat = place.geometry.location.lat();
            var lon = place.geometry.location.lng();
            console.log(lat);
            console.log(lon);
            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
      }


  render() {
    return (
      <div>
       <input id="pac-input" className="form-control" size="45" type="text" placeholder="Search Box"/>
      <button type="button" className="btn btn-danger btn-sm" onClick={this.handleMap.bind(this)}>View Map</button>
      <div id="map"  style={{height:"500px",width:"450px"}}></div>

      </div>
    );
  }
}
export default StaticMap;
