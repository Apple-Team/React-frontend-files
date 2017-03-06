import React, { Component } from 'react';
class MultipleMarkers extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another className
    super();
     this.state = { data:[]};
    this.handleMap = this.handleMap.bind(this);

  }
componentWillMount(){

    fetch("http://localhost:9000/collections/"+this.props.name)
            .then((response) => response.json())
            .then((responseJson) => {
               this.setState({
                data: responseJson

               });
            });

    }
handleMap(){
 var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: new google.maps.LatLng(this.state.data[0].latitude, this.state.data[0].longitude)      
    });

  for (var i = 0, length = this.state.data.length; i < length; i++) {
    var data1 = this.state.data[i],
      latLng = new google.maps.LatLng(data1.latitude, data1.longitude); 

  // Creating a marker and putting it on the map
   var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    title:data1.name
   
  });
  var content='<div>'+
            '<div id="siteNotice">'+
            '</div>'+
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


  }
  render() {

    if(this.props.lati)
      this.handleMap();
    return (
      <div>
        <button type="button" className="btn btn-warning btn-sm" onClick={this.handleMap}>Map</button>
        <div id="map" style={{height:"440px",width:"1120px"}}></div>
      </div>
    );
  }
}
export default MultipleMarkers;