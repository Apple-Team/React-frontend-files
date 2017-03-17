import React, { Component } from 'react';
class Maps extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another className
    super();

    this.handleMap = this.handleMap.bind(this);

  }

  handleMap(){
    var uluru = {lat:this.props.lati, lng:this.props.long};
          var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 17,
            center: uluru
          });
          var marker = new google.maps.Marker({
            position: uluru,
            map: map
          });
        }
  render() {

    if(this.props.lati)
      this.handleMap();
    return (
      <div style={{height:"100%",width:"100%"}}>
      <div id="map" style={{height:"422px"}}> </div>
     </div>
    );
  }
}
export default Maps;
