import React, { Component } from 'react';
import { Link } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import './Restaurant_detail.css';
import GoogleMap from 'google-map-react';

class Restaurant_detail extends Component {
	constructor() {
		// In a constructor, call `super` first if the className extends another classNameName
		super();
    
	}
    componentDidMount() {
  this.map = new google.maps.Map(this.refs.map, {
    center: EIFFEL_TOWER_POSITION,
    zoom: 16
  });
}
    







	// `render` is called whenever the component's props OR state are updated.
	render() {
		// console.log('The App component was rendered')
  return (
<div>
	<Header />
	<div className="overlay">
 		<div id="tf-details">
 		   <div className="row">
                <div className="col-md-8 branding">
                    <div className="card mb-10">
                        <div className="card-header">
    		               <b>Olive Bistro</b>
  		                </div>
                       <img className="card-img" src={require("./images/bf.jpg")} alt="Card image cap"/>
                       <div className="card-block">
                             <p className="card-text">Cuisine: Mediterranean, Italian, European </p>
                             <p className="card-text">Address: Road 46, Inside Durgam Cheruvu, Jubilee Hills, Hyderabad</p>
                             <p className="card-text">Area: Jubilee Hills</p>
                             <p className="card-text">Workhours: 12 Noon to 11 PM</p>
                             <p className="card-text"><a href="http://www.olivebarandkitchen.com/Olive%20Bistro/index.php?brandid=4&branchid=3">View Restaurant Homepage</a></p>
            		         <p className="card-text"><a href="https://www.facebook.com/OliveBistroHyderabad/">View facebook page</a></p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 branding">
                     <div className="card">
                         <div className="card-block">
                          <h3>My Google Maps Demo</h3><section style={{height: "100%"}}>
      <GoogleMapLoader
        containerElement={
          <div
            {...props.containerElementProps}
            style={{
              height: "100%",
            }}
          />
        }
        googleMapElement={
          <GoogleMap
            ref={(map) => console.log(map)}
            defaultZoom={3}
            defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
            onClick={props.onMapClick}
          >
            {props.markers.map((marker, index) => {
              return (
                <Marker
                  {...marker}
                  onRightclick={() => props.onMarkerRightclick(index)} />
              );
            })}
          </GoogleMap>
        }
      />
    </section>
                            

                        </div>
                    </div>
                </div>
                <div className="col-md-4 branding">
                     <div className="card">
                         <div className="card-block">
                              <p className="card-text"><b>Contact details:</b></p>
                              <p className="card-text">Phone number: 040 69999127</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
  	</div>
    

</div>

	);
 }
}

export default Restaurant_detail;