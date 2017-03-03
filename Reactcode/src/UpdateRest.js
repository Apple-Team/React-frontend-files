import React, { Component } from 'react';
import {Link,hashHistory} from 'react-router';
import AdminHeader from './AdminHeader';
// webpack.config.js specifies index.js as the entry point, and
// index.js imports and renders this `App` component.
var lat,lon;
class UpdateRest extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another className
    super();

    this.state = {
    data1: [],
    get_data: [],
    image_data:[],
    lat1:[],lon1:[],
    imageStatus: 'loading....'
  };
      this.handleUpload = this.handleUpload.bind(this);

      this.getLoc = this.getLoc.bind(this);
     console.log('test');
  }
  componentWillMount(){
  fetch("http://localhost:9000/restaurants_by_id/"+this.props.params.index)
         .then((response) => response.json())
         .then((responseJson) => {
            this.setState({
             get_data: responseJson

            });
         });
}
componentDidMount(){
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

         var uluru= {lat:this.state.get_data.latitude, lng:this.state.get_data.longitude};
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
 }
 handleImageLoaded() {
    this.setState({ imageStatus: 'Image Uploaded' });
  }

  handleImageErrored() {
    this.setState({ imageStatus: 'Upload Image' });
  }

  handleUpload(){
      var formData = new FormData();
      var photo=document.getElementById('FileUpload').files[0];

      console.log(photo);

      formData.set('image',photo);
      fetch('http://localhost:9000/images', {
        method:'POST',
         body: formData
      }).then((response) => response.json())
      .then((responseJson) => {
         this.setState({
          image_data: responseJson

         });
      });

  }



 handleUpdate(id){
  this.id=id;
  fetch('http://localhost:9000/update_a_restaurant/'+ id,
    {
      headers :{
        "Content-Type" : "application/json"
      },
    method: "PUT",
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
                           "latitude": this.state.lat1,
                           "longitude": this.state.lon1,
                           "workHours": document.getElementById('working hours').value,
                           "image": this.state.image_data

                         })
   })
   .then((response) => response.json())
   .then((responseJson) => {
      this.setState({
       data1: responseJson

      });
   });
   console.log(this.state.data1);
   hashHistory.push('/ViewRest/')
 }

 handleChange(event){
  this.setState({get_data: event.target.value});
 }


 getLoc(){
   this.setState({lat1:lat});
   this.setState({lon1:lon});
  this.state.get_data.latitude=this.state.lat1;
   this.state.get_data.longitude=this.state.lon1;
   console.log(this.state.get_data.latitude);
 }

 render() {
    // console.log('The App component was rendered')

    return(

      <div id="Update">
      <div className="overlay">
             <div className="row">
               <div className="col" id="col1">
                    <AdminHeader />
                </div>
             </div>
       </div>
       <div className="card card-block">
          <div  className="container" >
            <div className="row">
                <div className="col col-sm-6">
                  <div className="form-group row">
                      <label className="col-2 col-form-label">Name</label>
                      <div className="col-6">
                          <input type="text" value={this.state.get_data.name} onChange={this.handleChange} id="name"/>
                      </div>
                </div>
  <div className="form-group row">
    <label for="example-text-input" className="col-2 col-form-label">Area</label>
    <div className="col-6">
       <input type="text" value={this.state.get_data.area} onChange={this.handleChange} id="area"/>
    </div>
  </div>
  <div className="form-group row">
    <label for="example-text-input" className="col-2 col-form-label">Address</label>
    <div className="col-6">
      <input type="text" value={this.state.get_data.address} onChange={this.handleChange} id="address"/>
    </div>
  </div>
   <div className="form-group row">
    <label for="example-text-input" className="col-2 col-form-label">Cuisine</label>
    <div className="col-6">
      <input type="text" value={this.state.get_data.cuisine} onChange={this.handleChange} id="cuisine"/>
    </div>
  </div>
  <div className="form-group row">
    <label for="example-text-input" className="col-2 col-form-label">Description</label>
    <div className="col-6">
      <input type="text" value={this.state.get_data.description} onChange={this.handleChange} id="description"/>
    </div>
  </div>
  <div className="form-group row">
    <label for="example-text-input" className="col-2 col-form-label">Collection</label>
    <div className="col-6">
  <select className="custom-select" id="collection">
    <option selected>{this.state.get_data.collection}</option>
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
      <input type="text" value={this.state.get_data.homePage} onChange={this.handleChange} id="homepageurl"/>
    </div>
  </div>
  <div className="form-group row">
    <label for="example-url-input" className="col-2 col-form-label">Facebook Page URL</label>
    <div className="col-6">
      <input type="text" value={this.state.get_data.fbUrl} onChange={this.handleChange} id="fbpageurl"/>
    </div>
  </div>
  <div className="form-group row">
    <label for="example-tel-input" className="col-2 col-form-label">Telephone</label>
    <div className="col-6">
      <input type="text" value={this.state.get_data.number} onChange={this.handleChange} id="telephone"/>
    </div>
  </div>
  <div className="form-group row">
    <label for="example-text-input" className="col-2 col-form-label">Working Hours</label>
    <div className="col-6">
      <input type="text" value={this.state.get_data.workHours} onChange={this.handleChange} id="working hours"/>
    </div>
  </div>
  <div className="form-group row">
    <label for="example-text-input" className="col-2 col-form-label">Latitude</label>
    <div className="col-6">
      <input type="text" value={this.state.get_data.latitude} id="lat"/>
    </div>
  </div>
  <div className="form-group row">
    <label for="example-text-input" className="col-2 col-form-label">Longitude</label>
    <div className="col-6">
      <input type="text" value={this.state.get_data.longitude} id="long"/>
    </div>
  </div>
  <div className="form-group row">
      <label for="exampleInputFile" className="col-2 col-form-label">Image</label>
      <div className="col-6">
         <input type="file" class="form-control-file" id="FileUpload" name="image" aria-describedby="fileHelp"/>
         <small id="fileHelp" className="form-text text-muted">Browse Image file location </small>
         <button type="button" className="btn btn-danger btn-sm" onClick={this.handleUpload}>Update Image</button>

      </div>
  </div>
  <div className="form-group-row">
      <div className="col-6">
        <button type="button" className="btn btn-warning" onClick={() => this.handleUpdate(this.state.get_data.id)}>Submit</button>
      </div>
  </div>
</div>

  <div className="col col-sm-6">
    <div className="card">
      <div className="card-block">
        <div>
          <input id="pac-input" className="form-control" size="45" type="text" placeholder="Search Box"/>

          <div id="map"  style={{height:"500px",width:"450px"}}></div>
            <button type="button" className="btn btn-danger btn-sm" onClick={this.getLoc}>Get LatLong</button>
          </div>
       </div>
    </div>



          <div>
            <img src={this.state.image_data} onLoad={this.handleImageLoaded.bind(this)} onError={this.handleImageErrored.bind(this)} height="300px" width="450px"/>
             {this.state.imageStatus}
         </div>



  </div>


</div>
</div>
</div>
</div>


      );
  }
}
export default UpdateRest;
