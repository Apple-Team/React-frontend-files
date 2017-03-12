import React, { Component } from 'react';
import {Link,hashHistory} from 'react-router';
import StaticMap from './StaticMap';
import AdminHeader from './AdminHeader';
// webpack.config.js specifies index.js as the entry point, and
// index.js imports and renders this `App` component.
var lat,lon;
class AddRest extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another className
    super();
    this.state = { data: [],lat1:[],lon1:[],image_data:[],imgSrc:'' };
    this.handleClick=this.handleClick.bind(this);


    this.getLoc = this.getLoc.bind(this);
    this.onChange= this.onChange.bind(this);
    console.log('test');
  }

  componentDidMount() {
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
   var tok=window.sessionStorage.getItem('token');
   var that=this;
   var formData = new FormData();
   var photo=document.getElementById('FileUpload').files[0];

   console.log(photo);

   formData.set('image',photo);
   fetch('http://localhost:9000/images', {
     method:'POST',
      body: formData
   }).then((response) => response.json())
   .then((responseJson) => {
      that.setState({
       image_data: responseJson

      });
   }).then(function(data){
    fetch('http://localhost:9000/rest',
      {
        headers :{
          "Content-Type" : "application/json",
           "Authorization": "Bearer "+tok
        },
      method: "POST",
       body: JSON.stringify({
                              "name": document.getElementById('name').value,
                              "cuisine": document.getElementById('cuisine').value,
                              "address": document.getElementById('address').value,
                              "area": document.getElementById('area').value,
                              "collection": document.getElementById('collection').value,
                              "description": document.getElementById('descriptn').value,
                              "homePage": document.getElementById('homepageurl').value,
                              "fbUrl": document.getElementById('fbpageurl').value,
                              "number": document.getElementById('telephone').value,
                              "latitude": document.getElementById('lat').value,
                              "longitude": document.getElementById('long').value,
                              "workHours": document.getElementById('working hours').value,
                              "image": that.state.image_data

                            })
     }).then(response=>{
       if(200==response.status){
         window.location.reload();
        hashHistory.push('/ViewRest/');
            }
        else if (403==response.status) {
        window.alert("Forbidden!!");
        }
        else{
            window.alert("please register!!");
        }
      });
    });
}
 getLoc(){
  this.setState({lat1:lat});
  this.setState({lon1:lon});
 }
 onChange(){
  // Assuming only image

  var file = document.getElementById('FileUpload').files[0];
  var reader = new FileReader();
  var url = reader.readAsDataURL(file);

   reader.onloadend = function (e) {
      this.setState({
          imgSrc: [reader.result]
      })
    }.bind(this);
  console.log(url);

}


  // `render` is called whenever the component's props OR state are updated.
  render() {
    console.log(this.state.image_data);
    // console.log('The App component was rendered')
    return(
<div  id="content1">
<div className="row">
   <div className="col" id="col1">
      <AdminHeader />
  </div>
 </div>
 <div className="card card-block">
  <div  className="container" >
   <div className="row" style={{paddingLeft:"10%"}}>
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
   <input className="form-control" type="search" placeholder="About ur Bistro" id="descriptn"/>
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
       <input type="file" class="form-control-file" id="FileUpload" name="image" aria-describedby="fileHelp" onChange={this.onChange}/>
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

    <div>
     <input id="pac-input" className="form-control" size="45" type="text" placeholder="Search Box"/>

    <div id="map"  style={{height:"500px",width:"450px"}}></div>
    <button type="button" className="btn btn-warning btn-sm" onClick={this.getLoc}>Get LatLong</button>

  </div>
  <img src={this.state.imgSrc}  />

</div>

</div>
</div>

</div>


</div>
       );
   }
 }

export default AddRest;
