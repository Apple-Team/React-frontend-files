import React, { Component } from 'react';
import {Link} from 'react-router';
import StaticMap from './StaticMap';
// webpack.config.js specifies index.js as the entry point, and
// index.js imports and renders this `App` component.
var lat,lon;
class AddRest extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another className
    super();
    this.state = { data: [],lat1:[],lon1:[] };
    this.handleClick=this.handleClick.bind(this);
    this.handleMap = this.handleMap.bind(this);
    this.getLoc = this.getLoc.bind(this);
    console.log('test');
  }

  handleMap() {
         var map = new google.maps.Map(document.getElementById('map'), {
           center: {lat: 17.3850, lng: 78.4867},
           zoom: 13,
           panControl:true,
          zoomControl:true,
          mapTypeControl:true,
          scaleControl:true,
          streetViewControl:true,
          overviewMapControl:true,
          rotateControl:true
         });


         // Create the search box and link it to the UI element.
         var input = document.getElementById('pac-input');
         console.log(input.value);


          map.addListener('click', function(e) {
            placeMarkerAndPanTo(e.latLng, map);
          });

         var marker;
       function placeMarkerAndPanTo(latLng, map) {
         if(null==marker){

           marker = new google.maps.Marker({
           position: latLng,
           map: map
         });
         lat = latLng.lat();
         lon =latLng.lng();
       }
       else {
         marker.setPosition(latLng);
         lat = latLng.lat();
         lon =latLng.lng();
        }
         map.panTo(latLng);
       }


         var searchBox = new google.maps.places.SearchBox(input);
         map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

         // Bias the SearchBox results towards current map's viewport.
         map.addListener('bounds_changed', function() {
           searchBox.setBounds(map.getBounds());
         });

         var markers = [];
         // Listen for the event fired when the user selects a prediction and retrieve
         // more details for that place.
         searchBox.addListener('places_changed', function() {
           var places = searchBox.getPlaces();

           if (places.length == 0) {
             return;
           }

           // Clear out the old markers.
           markers.forEach(function(marker) {
             marker.setMap(null);
           });
           markers = [];

           // For each place, get the icon, name and location.
           var bounds = new google.maps.LatLngBounds();
           places.forEach(function(place) {
             if (!place.geometry) {
               console.log("Returned place contains no geometry");
               return;
             }
             var icon = {
               url: place.icon,
               size: new google.maps.Size(71, 71),
               origin: new google.maps.Point(0, 0),
               anchor: new google.maps.Point(17, 34),
               scaledSize: new google.maps.Size(25, 25)
             };

             // Create a marker for each place.
             markers.push(new google.maps.Marker({
               map: map,
               icon: icon,
               title: place.name,
               position: place.geometry.location
             }));
             lat = place.geometry.location.lat();
             lon =place.geometry.location.lng();
             console.log(lat);
             console.log(lon);
             if (place.geometry.viewport) {
               // Only geocodes have viewport.
               bounds.union(place.geometry.viewport);
             } else {
               bounds.extend(place.geometry.location);
             }
           });
           map.fitBounds(bounds);
         });


  }


   handleClick(ev){
    fetch('http://localhost:9000/rest',
      {
        headers :{
          "Content-Type" : "application/json"
        },
      method: "POST",
       body: JSON.stringify({
                              "name": document.getElementById('name').value,
                              "cuisine": document.getElementById('cuisine').value,
                              "address": document.getElementById('address').value,
                              "area": document.getElementById('area').value,
                              "collection": document.getElementById('collection').value,
                              "description": document.getElementById('description').value,
                              "homePage": document.getElementById('homepageurl').value,
                              "fbUrl": document.getElementById('fbpageurl').value,
                              "number": document.getElementById('telephone').value,
                              "latitude": document.getElementById('lat').value,
                              "longitude": document.getElementById('long').value,
                              "workHours": document.getElementById('working hours').value,
                              "image": document.getElementById('FileUpload').value

                            })
     })
     .then(function (data) {
  alert('Added into the database',data);

  })
  .catch(function (error) {
  alert('Not added into the database',error);
  });
 }
 getLoc(){
  this.setState({lat1:lat});
  this.setState({lon1:lon});
 }

  // `render` is called whenever the component's props OR state are updated.
  render() {
    // console.log('The App component was rendered')
    return(
<div  id="content1">
<div className="row">
               <div className="col" id="col1">
                    <nav className="navbar  sticky-top navbar-toggleable-md navbar-light bg-faded">
                        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                          <span className="navbar-toggler-icon"></span>
                         </button>
                         <a className="navbar-brand" href="#"><img src={require('./images/logo.png')} width="40" height="40" className="d-inline-block" />FindO Bistro</a>

                         <div className="nav-dropdown collapse pull-xs-right nav navbar-nav navbar-toggleable-sm" id="navbarTogglerDemo02">

                             <ul className="navbar-nav">
                                 <li className="nav-item active">
                                      <Link to="/ViewRest" className="nav-link" >View All Restaurants</Link>
                                 </li>
                                 <li className="nav-item">
                                      <Link to="/AddRest" className="nav-link" >Add Restaurant</Link>
                                 </li>

                                 <li className="nav-item " id="admin">
                                     <Link to ="/Admin" className="nav-link">Logout</Link>
                                 </li>

                            </ul>
                        </div>

                    </nav>
                 </div>
             </div>
    <div  className="container" >
    <div className="row">
    <div className="col col-sm-6">
 <div className="form-group row">
  <label className="col-2 col-form-label">Name</label>
  <div className="col-6">
    <input className="form-control" name="username" type="search" placeholder="Restaurant Name" id="name"/>
  </div>
</div>
<div className="form-group row">
  <label for="example-text-input" className="col-2 col-form-label">Area</label>
  <div className="col-6">
    <input className="form-control" type="search" placeholder="ex: Banjara Hills" id="area"/>
  </div>
</div>
<div className="form-group row">
  <label for="example-text-input" className="col-2 col-form-label">Address</label>
  <div className="col-6">
    <input className="form-control" type="search" placeholder="ex: Road 3,Banjara Hills, Hyderabad" id="address"/>
  </div>
</div>
 <div className="form-group row">
  <label for="example-text-input" className="col-2 col-form-label">Cuisine</label>
  <div className="col-6">
    <input className="form-control" type="search" placeholder="ex: American, Desserts, Cafe" id="cuisine"/>
  </div>
</div>
<div className="form-group row">
 <label for="example-text-input" className="col-2 col-form-label">Description</label>
 <div className="col-6">
   <input className="form-control" type="search" placeholder="About ur Bistro" id="description"/>
 </div>
</div>
<div className="form-group row">
  <label for="example-text-input" className="col-2 col-form-label">Collection</label>
  <div className="col-6">
<select className="custom-select" id="collection">
  <option selected>Open this select collection</option>
  <option value="Breakfast">Breakfast</option>
  <option value="Sunday Brunch">Sunday Brunch</option>
  <option value="Fine Dining">Fine Dine</option>
  <option value="Barbeque & Grills">Barbeque & Grills</option>
  <option value="Frozen Delights">Frozen Delight</option>
  <option value="Street Food">Street Food</option>
</select>
</div>
</div>
<div className="form-group row">
  <label for="example-url-input" className="col-2 col-form-label">Home Page URL</label>
  <div className="col-6">
    <input className="form-control" type="url" placeholder="ex: http://www.hotelexample.com" id="homepageurl"/>
  </div>
</div>
<div className="form-group row">
  <label for="example-url-input" className="col-2 col-form-label">Facebook Page URL</label>
  <div className="col-6">
    <input className="form-control" type="url" placeholder="ex :https://www.facebook.com/exaple" id="fbpageurl"/>
  </div>
</div>
<div className="form-group row">
  <label for="example-tel-input" className="col-2 col-form-label">Telephone</label>
  <div className="col-6">
    <input className="form-control" type="tel" placeholder="ex: 1-(555)-555-5555" id="telephone"/>
  </div>
</div>
<div className="form-group row">
  <label for="example-text-input" className="col-2 col-form-label">Working Hours</label>
  <div className="col-6">
    <input className="form-control" type="search" placeholder="ex: 9AM to 9PM" id="working hours"/>
  </div>
</div>
<div className="form-group row">
  <label for="example-text-input" className="col-2 col-form-label">Latitude</label>
  <div className="col-6">
    <input className="form-control" type="search" value={this.state.lat1} id="lat" />
  </div>
</div>
<div className="form-group row">
  <label for="example-text-input" className="col-2 col-form-label" >Longitude</label>
  <div className="col-6">
    <input className="form-control" type="search" value={this.state.lon1} id="long" />
  </div>
</div>
<div className="form-group row">
    <label for="exampleInputFile" className="col-2 col-form-label">Image</label>
    <div className="col-6">
       <input type="file" class="form-control-file" id="FileUpload" aria-describedby="fileHelp"/>
       <small id="fileHelp" className="form-text text-muted">Browse Image file location </small>
    </div>
  </div>
<div className="form-group-row">
    <div className="col-6">
      <button type="button" className="btn btn-warning" onClick={this.handleClick.bind(this)}>Submit</button>
    </div>
</div>
</div>

<div className="col col-sm-6">
  <div className="card">
    <div className="card-block">
    <div>
     <input id="pac-input" className="form-control" size="45" type="text" placeholder="Search Box"/>
    <button type="button" className="btn btn-danger btn-sm" onClick={this.handleMap.bind(this)}>View Map</button>
    <div id="map"  style={{height:"500px",width:"450px"}}></div>
    <button type="button" className="btn btn-danger btn-sm" onClick={this.getLoc}>Get LatLong</button>

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

export default AddRest;
