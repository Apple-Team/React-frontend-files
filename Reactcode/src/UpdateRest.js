import React, { Component } from 'react';
import {Link,hashHistory} from 'react-router';
import AdminHeader from './AdminHeader';
import PreviewImg from './PreviewImg';
// webpack.config.js specifies index.js as the entry point, and
// index.js imports and renders this `App` component.
var lat,lon;
var lat1,lon1,collnames;
var collnames1=new Array();

class UpdateRest extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another className
    super();

    this.state = {
    data1: [],
    get_data: [],
    img:[]
  };
      this.PrvImg=this.PrvImg.bind(this);
      this.getLoc = this.getLoc.bind(this);
     console.log('test');
  }
  componentWillReceiveProps(nextProps){
    var that=this;
    var tok=window.sessionStorage.getItem('token');
  fetch("http://localhost:9000/restaurants_by_id/"+nextProps.params.index,{
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+tok
        }
        }).then((response) => response.json())
         .then((responseJson) => {
            this.setState({
             get_data: responseJson

            });
         }).then(function(e){
          var map = new google.maps.Map(document.getElementById('map'), {
           center: {lat: that.state.get_data.latitude, lng: that.state.get_data.longitude},
           zoom: 17,
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

         var uluru= {lat:that.state.get_data.latitude, lng:that.state.get_data.longitude};
          var marker = new google.maps.Marker({
            position: uluru,
            map: map
          });
       function placeMarkerAndPanTo(latLng, map) {
         marker.setPosition(latLng);
         lat = latLng.lat();
         lon =latLng.lng();
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
       });
         collnames=JSON.parse(localStorage.getItem("collnames"));
for(var k=0;k<collnames.length;k++)
collnames1[k]=collnames[k].collection;
console.log(collnames);
console.log(collnames1);
 }

PrvImg(image_data)
{
  if(image_data!=''){
  console.log(image_data);
  this.state.img=image_data;
  console.log(this.state.img);
  }
  else
    this.state.img=this.state.get_data.image;

}

 handleUpdate(id){
   var tok=window.sessionStorage.getItem('token');
   var img1=this.state.img;
   if(!this.state.image_data){
     this.state.image_data=this.state.get_data.image;
   }
  this.id=id;
  fetch('http://localhost:9000/update_a_restaurant/'+ id,
    {
      headers :{
        "Content-Type" : "application/json",
        "Authorization": "Bearer "+tok
      },
    method: "PUT",
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
                           "latitude": lat1,
                           "longitude": lon1,
                           "image": img1,
                           "workHours": document.getElementById('opening_time').value+"AM to"+ document.getElementById('closing_time').value+"PM",
                           "opening_time": document.getElementById('opening_time').value,
                           "closing_time": document.getElementById('closing_time').value,
                           "free_delivery": document.getElementById('free_delivery').value,
                           "cost": document.getElementById('cost').value



                         })
   }).then(response=>{
     if(200==response.status){
       console.log(this.state.data1);
       window.location.reload();
       hashHistory.push('/ViewRest/')
      }
      else if (403==response.status) {
      window.alert("Forbidden!!");
      }
      else{
         hashHistory.push('/UnAuth');
      }
    });
   }

 handleChange(event){
  this.setState({
    get_data: event.target.value});
 }




 getLoc(){
   lat1=lat;
   lon1=lon;
   console.log(lat);
   document.getElementById('lat').value=lat1;
   document.getElementById('long').value=lon1;
 }

 render() {
   console.log('render');
   lat1=this.state.get_data.latitude;
   lon1=this.state.get_data.longitude;
    return(

    <div id="content1">
      <div className="row">
         <div className="col" id="col1">
            <AdminHeader />
        </div>
        </div>
        <section>
            <div id="container1_demo" >
            <div id="wrapper1" style={{width:"1300px"}}>
              <div id="register">
                   <form autocomplete="on">
                    <h1>Update Restaurant</h1>
          <div  className="container" >
            <div className="row">
                <div className="col col-sm-6">
  <div className="form-group row">
     <label className="col-2 col-form-label">Name</label>
         <div className="col-8">
               <input type="text"  className="form-control" value={this.state.get_data.name} onChange={this.handleChange} id="name"/>
          </div>
   </div>
  <div className="form-group row">
    <label for="example-text-input" className="col-2 col-form-label">Area</label>
    <div className="col-8">
       <input type="text" className="form-control" value={this.state.get_data.area} onChange={this.handleChange} id="area"/>
    </div>
  </div>
  <div className="form-group row">
    <label for="example-text-input" className="col-2 col-form-label">Address</label>
    <div className="col-8">
      <input type="text"  className="form-control" value={this.state.get_data.address} onChange={this.handleChange} id="address"/>
    </div>
  </div>
   <div className="form-group row">
    <label for="example-text-input" className="col-2 col-form-label">Cuisine</label>
    <div className="col-8">
      <input type="text"  className="form-control" value={this.state.get_data.cuisine} onChange={this.handleChange} id="cuisine"/>
    </div>
  </div>
  <div className="form-group row">
    <label for="example-text-input" className="col-2 col-form-label">Description</label>
    <div className="col-8">
      <input type="text"  className="form-control" rows="4" value={this.state.get_data.description} onChange={this.handleChange} id="descriptn"/>
    </div>
  </div>
  <div className="form-group row">
    <label for="example-text-input" className="col-2 col-form-label">Collection</label>
    <div className="col-8">
  <select className="custom-select" id="collection">{
  collnames1.map((data,index)=>{
           return (
  <option value={collnames1[index]} >{collnames1[index]}</option>  
  )}
)}
  </select>
  </div>
  </div>
  <div className="form-group row">
    <label for="example-url-input" className="col-2 col-form-label">Home Page URL</label>
    <div className="col-8">
      <input type="text"  className="form-control" value={this.state.get_data.homePage} onChange={this.handleChange} id="homepageurl"/>
    </div>
  </div>
  <div className="form-group row">
    <label for="example-url-input" className="col-2 col-form-label">Facebook Page URL</label>
    <div className="col-8">
      <input type="text"  className="form-control" value={this.state.get_data.fbUrl} onChange={this.handleChange} id="fbpageurl"/>
    </div>
  </div>
  <div className="form-group row">
    <label for="example-tel-input" className="col-2 col-form-label">Telephone</label>
    <div className="col-8">
      <input type="text"  className="form-control" value={this.state.get_data.number} onChange={this.handleChange} id="telephone"/>
    </div>
  </div>
  <div className="form-group row">
  <label for="example-text-input" className="col-2 col-form-label">Working Hours</label>
  <div className="col-3">
    <input className="form-control" type="search" value={this.state.get_data.opening_time} onChange={this.handleChange} id="opening_time"/>
  </div>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <div className="col-3">
     <input className="form-control" type="search"  value={this.state.get_data.closing_time} onChange={this.handleChange} id="closing_time"/>
  </div>
</div>
<div className="form-group row">
  <label for="example-text-input" className="col-2 col-form-label">Free Delivery</label>
  <div className="col-8">
    <label className="form-check-label">
           <select className="custom-select" id="free_delivery">
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
    </label>
  </div>
</div>
<div className="form-group row">
  <label for="example-text-input" className="col-2 col-form-label">Cost</label>
  <div className="col-8">
    <input className="form-control" type="search" value={this.state.get_data.cost} onChange={this.handleChange} id="cost" />
  </div>
</div>
  <div className="form-group row">
    <label for="example-text-input" className="col-2 col-form-label">Latitude</label>
    <div className="col-8">
      <input type="text"  className="form-control" value={lat1} id="lat"/>
    </div>
  </div>
  <div className="form-group row">
    <label for="example-text-input" className="col-2 col-form-label">Longitude</label>
    <div className="col-8">
      <input type="text"  className="form-control" value={lon1} id="long"/>
    </div>
  </div>

  <div className="form-group-row">
      <div className="col" style={{paddingLeft: "18%"}}>
        <button type="button" className="btn btn-warning" onClick={() => this.handleUpdate(this.state.get_data.id)}>Submit</button>
      </div>
  </div>
</div>

  <div className="col col-sm-6">
        <div>
          <input id="pac-input" className="form-control" size="45" type="text" placeholder="Search Box" style={{width:"60%"}}/>

          <div id="map"  style={{height:"500px",width:"450px"}}></div>
            <button type="button" className="btn btn-warning btn-sm" onClick={this.getLoc}>Get LatLong</button>
          </div>
          <hr/>
        <PreviewImg Img={this.PrvImg} pic={this.state.get_data.image}/>

  </div>

</div>
</div>
</form>
  </div>

 </div>
</div>
</section>
</div>


      );
  }
}
export default UpdateRest;