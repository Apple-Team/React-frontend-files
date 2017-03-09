import React, { Component } from 'react';
import { Link } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import './Restaurant_detail.css';
import MapDirections from'./MapDirections';
var lat1,long1;
class Restaurant_detail extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another classNameName
    super();
    this.state = { detail_data:[] };

  }
  componentDidMount(){
    var tok=window.sessionStorage.getItem('token');
    lat1=this.props.params.lat;
    long1=this.props.params.long;
    fetch("http://localhost:9000/restaurants_by_id/"+this.props.params.id,{
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+tok
        }
    })
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
                <div className="col col-lg-5 branding" id="firstcol">
                  <div className="card" >
                      <img className="card-img-top image-fluid" src={this.state.detail_data.image} alt="Card image cap"/>
                      <div className="card-block">
                        <div className="card-title"><h1><b>{this.state.detail_data.name}</b></h1></div>
                         <p className="card-text">{this.state.detail_data.description}</p>
                     </div>
                     <ul className="list-group list-group-flush">
                        <li className="list-group-item">Cuisine: {this.state.detail_data.cuisine}</li>
                        <li className="list-group-item">Working Hours: {this.state.detail_data.workHours}</li>
                     </ul>
                     <ul className="list-group list-group-flush">
                        <li className="list-group-item">Phone number: {this.state.detail_data.number}</li>
                     </ul>
                     <div className="card-block">
                        <a href={this.state.detail_data.homePage} target="_blank">View Restaurant Homepage</a>&nbsp;&nbsp;&nbsp;
                        <a href={this.state.detail_data.fbUrl} target="_blank">View facebook page</a>
                     </div>
                  </div>
                </div>

              <div className="col col-lg-5" id="secondcol">
                  <div className="card text-center">
                      <div className="card-header">
                        Address
                      </div>
                     <div className="card-block">
                         <p className="card-text">{this.state.detail_data.address}</p>
                         <p className="card-text">{this.state.detail_data.area}</p>
                     </div>
                     <div className="card-header">
                        Map View
                      </div>
                     <div className="card-block">
                        <MapDirections destlat={lat} destlong={lng} orgnlat={lat1} orgnlong={long1}/>
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
