import React, { Component } from 'react';
import { Link } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import './Restaurant_detail.css';
import GoogleMap from 'google-map-react';
import Maps from'./Maps';
class Restaurant_detail extends Component {
	constructor() {
		// In a constructor, call `super` first if the className extends another classNameName
		super();
    this.state = { detail_data:[] };
    
	}
  componentDidMount(){
    
    fetch("http://localhost:9000/restaurants_by_id/"+this.props.params.id)
            .then((response) => response.json())
            .then((responseJson) => {
               this.setState({
                detail_data: responseJson

               });
            });
    
    }
  	// `render` is called whenever the component's props OR state are updated.
	render() {
		// console.log('The App component was rendered')
    var lat=this.state.detail_data.latitude;
    var lng=this.state.detail_data.longitude;
  return (
  <div>
		<div id="detailRest">
        <div className="row" id="searchrest">
                <div className="col col-sm-6 branding">
                    <div className="card mb-10">
                       <img className="card-img-top" src={this.state.detail_data.image} alt="Card image cap"/>
                    </div>
                </div>
          
              <div className="col col-sm-4">                
                <div className="row branding">
                  <div className="row">
                     <div className="card w-100">
                         <div className="card-block">
                              <p className="card-text"><b>Contact details:</b></p>
                              <p className="card-text">Phone number: {this.state.detail_data.number}</p>
                        </div>
                      </div>
                     <div className="card w-100">
                        <div className="card-block w-100">
                              <p className="card-text"><b>Address:</b></p>
                              <p className="card-text">{this.state.detail_data.address}</p>
                              <p className="card-text">{this.state.detail_data.area}</p>
                        </div>
                     </div>
                  </div>                 
                </div>
              </div>
          </div>
           <div className="row">
                <div className="col col-sm-14">
                  <div className="card-block">
                          <div className="card-sub-header">
                            <b>{this.state.detail_data.name}</b>
                          </div>
                             <p className="card-text">Cuisine: {this.state.detail_data.cuisine} </p>
                             <p className="card-text">Working Hours: {this.state.detail_data.workHours}</p>
                             <p className="card-text"><a href={this.state.detail_data.homePage} target="_blank">View Restaurant Homepage</a></p>
                             <p className="card-text"><a href={this.state.detail_data.fbUrl} target="_blank">View facebook page</a></p>
                  </div>
                </div>
            </div>
            <div className="row branding">
                <div className="card">
                   <div className="card-block">
                      <Maps lati={lat} long={lng}/>                                                    
                   </div>
                </div>
            </div>
     </div>
  </div>

	);
 }
}

export default Restaurant_detail;