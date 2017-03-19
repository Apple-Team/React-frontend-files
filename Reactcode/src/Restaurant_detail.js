import React, { Component } from 'react';
import { Link ,hashHistory} from 'react-router';
import UserHeader from './UserHeader';
import Footer from './Footer';
import './Restaurant_detail.css';
import GoogleMap from 'google-map-react';
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';
import StarRatingComponent from 'react-star-rating-component';
import Maps from'./Maps';
class Restaurant_detail extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another classNameName
    super();
    this.state = { detail_data:[], rating: 0,popoverOpen: false};
      this.toggle = this.toggle.bind(this);

  }
   toggle() {
   this.setState({
     popoverOpen: !this.state.popoverOpen
   });
 }
  componentDidMount(){
  console.log(window.sessionStorage.getItem('token'));
  var tok=window.sessionStorage.getItem('token');
    fetch("http://localhost:9000/restaurants_by_id/"+this.props.params.id,{
       headers: {
           "Content-Type": "application/json",
           "Authorization": "Bearer "+tok
         }
        }).then(response=>{
          if(200==response.status){
            response.json().then((data)=>{
                  this.setState({
                   detail_data: data
                  });
                });
               }
           else if (403==response.status) {
           window.alert("Forbidden!!");
           }
           else{
              hashHistory.push('/UnAuth');
           }
         });
    }

    

    

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
        console.log(this.state.rating);
    }

    // `render` is called whenever the component's props OR state are updated.
  render() {
    const { rating } = this.state.rating;
    // console.log('The App component was rendered')
    var lat=this.state.detail_data.latitude;
    var lng=this.state.detail_data.longitude;
    if(this.state.detail_data.free_delivery)
        document.getElementById('fd').style.display="block";

  return (
  <div>
    <div id="detailRest">
    
        <div className="row" id="searchrest" >
                <div className="col col-lg-7 branding" id="firstcol">
                  <div className="card" >
                      <img className="card-img-top image-fluid" src={this.state.detail_data.image} id="cardrest" alt="Card image cap"/>
                      <div className="card-block">
                        <div className="card-title"><h1><b>{this.state.detail_data.name}</b></h1></div>
                         <p className="card-text">{this.state.detail_data.description}</p>
                     </div>
                     <ul className="list-group list-group-flush">
                        <li className="list-group-item">Cuisine: {this.state.detail_data.cuisine}</li>
                        <li className="list-group-item">Working Hours: {this.state.detail_data.workHours}</li>
                     </ul>
  
                     <ul className="list-group list-group-flush">
                        <li className="list-group-item">Cost: {this.state.detail_data.cost} per Two</li>
                        <li className="list-group-item" id="fd" style={{display:"none"}}>Free Home Delivery</li>
                     </ul>
                     <div className="card-block">
                        <a href={this.state.detail_data.homePage} target="_blank">View Restaurant Homepage</a>&nbsp;&nbsp;&nbsp;
                        <a href={this.state.detail_data.fbUrl} target="_blank">View facebook page</a>&nbsp;&nbsp;&nbsp;
                         <Button id="Popover1" style={{backgroundColor:"transparent",borderColor:"transparent"}}  onClick={this.toggle} >
                            <i className="fa fa-phone" aria-hidden="true"></i>
                        </Button>
                       <Popover placement="top" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
                          <PopoverTitle>
                            Call
                          </PopoverTitle>
                         <PopoverContent>
                              <div className="container" align="center">
                                       <label><b><center>PHONE NUMBER</center></b></label> <br />
                                     {this.state.detail_data.number}
                               </div>
                         </PopoverContent>
                        </Popover>
                        
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
                        <Maps lati={lat} long={lng}/>
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
