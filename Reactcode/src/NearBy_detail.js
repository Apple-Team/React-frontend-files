import React, { Component } from 'react';
import { Link,hashHistory} from 'react-router';
import Header from './Header';
import Footer from './Footer';
import './Restaurant_detail.css';
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';
import MapDirections from'./MapDirections';
var lat1,long1;
class NearBy_detail extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another classNameName
    super();
    this.state = { detail_data:[] ,popoverOpen: false};
     this.toggle = this.toggle.bind(this);

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


 toggle() {
   this.setState({
     popoverOpen: !this.state.popoverOpen
   });
 }
    // `render` is called whenever the component's props OR state are updated.
  render() {
    // console.log('The App component was rendered')
    var lat=this.state.detail_data.latitude;
    var lng=this.state.detail_data.longitude;
  return (
   <div>
   <Header/>
    <div id="detailRest" style={{height:"100%",width:"100%"}}>

        <div className="container" id="searchrest" >
           <div className="row">
                <div className="col col-lg-12 branding" id="firstcol">
                  <div className="card" >
                      <img className="card-img-top image-fluid" src={this.state.detail_data.image} id="cardrest" alt="Card image cap"/>
                      <div className="card-block">
                        <div className="card-title"><h1><b>{this.state.detail_data.name}</b>
                        <div className="pull-right fnav" id="footer">
                            <ul className="footer-social">
                               <li><a href={this.state.detail_data.homePage} target="_blank"><i className="fa fa-home" aria-hidden="true" id="homePage"></i></a></li>
                               <li><a href={this.state.detail_data.fbUrl} target="_blank"><i className="fa fa-facebook" id="facebook"></i></a></li>

                           </ul>
                        </div>
                        </h1>
                        </div>
                         <p className="card-text">{this.state.detail_data.description}</p>
                      </div>
                      <ul className="list-group list-group-flush">
                         <li className="list-group-item"><b id="sideHeading">Address:&nbsp;&nbsp;  </b> {this.state.detail_data.address}
                         </li>

                      </ul>
                     <ul className="list-group list-group-flush">
                        <li className="list-group-item"><b id="sideHeading">Cuisine:&nbsp;&nbsp;  </b> {this.state.detail_data.cuisine}</li>
                        <li className="list-group-item"><b id="sideHeading">Working Hours:&nbsp;&nbsp;</b> {this.state.detail_data.workHours}
                            <div className="pull-right fnav" id="footer">
                            <ul className="footer-social">
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

                           </ul>
                        </div>
                        </li>
                     </ul>

                     <ul className="list-group list-group-flush">
                        <li className="list-group-item"><b id="sideHeading">Cost:&nbsp;&nbsp;</b> {this.state.detail_data.cost} per Two</li>
                        <li className="list-group-item" id="fd" style={{display:"none"}}>
                          <b id="sideHeading">Free Home Delivery&nbsp;<i className="fa fa-check" style={{color:"green"}} aria-hidden="true"></i>
                          </b>
                        </li>
                     </ul>

                  </div>

                  <div className="card text-center">

                     <div className="card-header">
                        <b id="sideHeading">Map View</b>
                      </div>
                     <div className="card-block">
                       <MapDirections destlat={lat} destlong={lng} orgnlat={lat1} orgnlong={long1}/>
                     </div>
                  </div>
              </div>

            </div>
            <div className="row">


            </div>
         </div>
     </div>

  </div>

  );
 }
}

export default NearBy_detail;
