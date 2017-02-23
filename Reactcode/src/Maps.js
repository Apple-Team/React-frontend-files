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
    return (
      <div id="map" style={{height:"500px",width:"1000px"}}>
        <button type="button" className="btn btn-danger btn-sm" onClick={this.handleMap.bind(this)}>View Map</button>
      </div>
    );
  }
}
export default Maps;
