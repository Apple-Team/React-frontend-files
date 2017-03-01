import React, { Component } from 'react';
class MapDirections extends Component {
  
  constructor() {
    // In a constructor, call `super` first if the className extends another className
    super();

    this.handleMap = this.handleMap.bind(this);

  }

  handleMap(){
     var map = new google.maps.Map(document.getElementById('map'), {
          mapTypeControl: false,
          center: {lat: 17.3850, lng: 78.4867},
          zoom: 13
        });

        new AutocompleteDirectionsHandler(map);

       /**
        * @constructor
       */
      function AutocompleteDirectionsHandler(map) {
        this.map = map;
        this.originPlaceId = null;
        this.destinationPlaceId = null;
        this.travelMode = 'WALKING';
        var originInput = this.props.lati;
        //console.log(originInput);
        var destinationInput = this.props.long;
        console.log(destinationInput);
        var modeSelector = document.getElementById('mode-selector');
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.directionsDisplay.setMap(map);

        var originAutocomplete = new google.maps.places.Autocomplete(
            originInput, {placeIdOnly: true});
        var destinationAutocomplete = new google.maps.places.Autocomplete(
            destinationInput, {placeIdOnly: true});

        this.setupClickListener('changemode-walking', 'WALKING');
        this.setupClickListener('changemode-transit', 'TRANSIT');
        this.setupClickListener('changemode-driving', 'DRIVING');

        this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
        this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
      }

      // Sets a listener on a radio button to change the filter type on Places
      // Autocomplete.
      AutocompleteDirectionsHandler.prototype.setupClickListener = function(id, mode) {
        var radioButton = document.getElementById(id);
        var me = this;
        radioButton.addEventListener('click', function() {
          me.travelMode = mode;
          me.route();
        });
      };

      AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
        var me = this;
        autocomplete.bindTo('bounds', this.map);
        autocomplete.addListener('place_changed', function() {
          var place = autocomplete.getPlace();
          if (!place.place_id) {
            window.alert("Please select an option from the dropdown list.");
            return;
          }
          if (mode === 'ORIG') {
            me.originPlaceId = place.place_id;
          } else {
            me.destinationPlaceId = place.place_id;
          }
          me.route();
        });

      };

      AutocompleteDirectionsHandler.prototype.route = function() {
        if (!this.originPlaceId || !this.destinationPlaceId) {
          return;
        }
        var me = this;

        this.directionsService.route({
          origin: {'placeId': this.originPlaceId},
          destination: {'placeId': this.destinationPlaceId},
          travelMode: this.travelMode
        }, function(response, status) {
          if (status === 'OK') {
            me.directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      };
        }


 render() {
    return (
    	<div>
    <div id="mode-selector" className="controls">
      <input type="radio" name="type" id="changemode-walking" checked="checked" />
      <label for="changemode-walking">Walking</label>

      <input type="radio" name="type" id="changemode-transit" />
      <label for="changemode-transit">Transit</label>

      <input type="radio" name="type" id="changemode-driving" />
      <label for="changemode-driving">Driving</label>
    </div>
      <div id="map" style={{height:"420px",width:"520px"}}>
        <button type="button" className="btn btn-danger btn-sm" onClick={this.handleMap.bind(this)}>View Map</button>
      </div>
      </div>
    );
  }
}
export default MapDirections;