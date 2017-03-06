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
      zoom: 10,
      center: new google.maps.LatLng(17.3850, 78.4867)      
    });

  for (var i = 0, length = this.state.data.length; i < length; i++) {
    var data1 = this.state.data[i],
      latLng = new google.maps.LatLng(data1.latitude, data1.longitude); 

  // Creating a marker and putting it on the map
   var marker = new google.maps.Marker({
    position: latLng,
    map: map
   
  });
   var  contentString=this.state.data.name;
   var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

   
   marker.addListener('click', function() {
          if (infowindow) {infowindow.close();}
          infowindow = new google.maps.InfoWindow({content: contentString});
          infowindow.open(map, marker);
        });
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