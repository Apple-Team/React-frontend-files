import React, { Component } from 'react';
import {Link,hashHistory} from 'react-router';
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';
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
    this.toggle1 = this.toggle1.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.toggle3 = this.toggle3.bind(this);
    this.toggle4 = this.toggle4.bind(this);
    this.toggle5 = this.toggle5.bind(this);
    this.toggle6 = this.toggle6.bind(this);
    this.toggle7 = this.toggle7.bind(this);
    this.toggle8 = this.toggle8.bind(this);
    this.toggle9 = this.toggle9.bind(this);
     this.state = {
      popoverOpen1: false,
      popoverOpen2: false,
      popoverOpen3: false,
      popoverOpen4: false,
      popoverOpen5: false,
      popoverOpen6: false,
      popoverOpen7: false,
      popoverOpen8: false,
      popoverOpen9: false,
    };
    console.log('test');
  }

   toggle1() {
    this.setState({
      popoverOpen1: !this.state.popoverOpen1
    });
  }
   toggle2() {
    this.setState({
      popoverOpen2: !this.state.popoverOpen2
    });
  }
   toggle3() {
    this.setState({
      popoverOpen3: !this.state.popoverOpen3
    });
  }
   toggle4() {
    this.setState({
      popoverOpen4: !this.state.popoverOpen4
    });
  }

  toggle5() {
    this.setState({
      popoverOpen5: !this.state.popoverOpen5
    });
  }

   toggle6() {
    this.setState({
      popoverOpen6: !this.state.popoverOpen6
    });
  }
   toggle7() {
    this.setState({
      popoverOpen7: !this.state.popoverOpen7
    });
  }
   toggle8() {
    this.setState({
      popoverOpen8: !this.state.popoverOpen8
    });
  }

  toggle9() {
    this.setState({
      popoverOpen9: !this.state.popoverOpen9
    });
  }

   validate_homepageurl(ev){
   var homepageurl = document.getElementById("homepageurl");
   var uri=/^(ftp|http|https):\/\/[^ "]+$/;
  if(!homepageurl.value.match(uri)) {
    this.setState({
      popoverOpen1:true
    });
  } 
  else {
    this.setState({
      popoverOpen1:false
    });
  }
}

  validate_fbpageurl(ev){
   var fbpageurl = document.getElementById("fbpageurl");
   var uri=/^(ftp|http|https):\/\/[^ "]+$/;
  if(fbpageurl.value.match(uri)) {
    this.setState({
      popoverOpen2:false
    });
  } 
  else {
    this.setState({
      popoverOpen2:true
    });
  }
}

  validateTelephone(ev){
   var Telephone= document.getElementById("telephone");
   var format=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if(Telephone.length!=10&&(!Telephone.value.match(format))) {
    this.setState({
      popoverOpen3:true
    });
  } 
  else {
    this.setState({
      popoverOpen3:false
    });
  }
}

 validateOpening_time(ev){
   var Opening_time = document.getElementById("opening_time");
  var time = /^(?:(?:([01]?\d|2[0-3]):)+([0-5]?\d):)+([0-5]?\d)$/;
  if(!Opening_time.value.match(time)) {
    this.setState({
      popoverOpen4:true
    });
  } 
  else {
    this.setState({
      popoverOpen4:false
    });
  }
}

 validateClosing_time(ev){
   var Closing_time = document.getElementById("closing_time");
  var time = /^(?:(?:([01]?\d|2[0-3]):)+([0-5]?\d):)+([0-5]?\d)$/;
  if(!Closing_time.value.match(time)) {
    this.setState({
      popoverOpen5:true
    });
  } 
  else {
    this.setState({
      popoverOpen5:false
    });
  }
}

validateCost(ev){
   var Cost = document.getElementById("cost");
   var format=/^\d+$/;
  if(!Cost.value.match(format)) {
    this.setState({
      popoverOpen6:true
    });
  } 
  else {
    this.setState({
      popoverOpen6:false
    });
  }
}

validateLat(ev){
  if(document.getElementById("lat").value!='') {
    this.setState({
      popoverOpen7:false
    });
  } 
  else {
    this.setState({
      popoverOpen7:true
    });
  }
}

validateLong(ev){
  if(document.getElementById("long").value=='') {
    this.setState({
      popoverOpen8:true
    });
  } 
  else {
    this.setState({
      popoverOpen8:false
    });
  }
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
   console.log(document.getElementById('opening_time').value+"AM"+ document.getElementById('closing_time').value+"PM");

   var name= document.getElementById('name').value;
   var cuisine= document.getElementById('cuisine').value;
   var address= document.getElementById('address').value;
   var area=document.getElementById('area').value;
   var collection=document.getElementById('collection').value;
   var description= document.getElementById('descriptn').value;
   var free_delivery= document.getElementById('free_delivery').value;

   if(name==''||cuisine==''||address==''||area==''||collection==''||description==''||free_delivery==''||(this.state.popoverOpen1)||(this.state.popoverOpen2)||(this.state.popoverOpen3)||(this.state.popoverOpen4)||(this.state.popoverOpen5)||(this.state.popoverOpen6)||(this.state.popoverOpen7)||(this.state.popoverOpen8)||(photo==undefined)){
    if(photo==undefined){
    this.setState({
      popoverOpen9:true
    });
    }
      alert('Fill all the details in correct format');
    }
    else{

       this.setState({
      popoverOpen9:false
    });

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
                              "workHours": document.getElementById('opening_time').value+"AM to"+ document.getElementById('closing_time').value+"PM",
                              "image": that.state.image_data,
                              "opening_time": document.getElementById('opening_time').value,
                              "closing_time": document.getElementById('closing_time').value,
                              "free_delivery": document.getElementById('free_delivery').value,
                              "cost": document.getElementById('cost').value


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
            window.alert("Not added");
        }
      });
    });
   }
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
  <div className="col-8">
    <input className="form-control" name="username" type="search" placeholder="Restaurant Name" id="name"/>
  </div>
</div>
<div className="form-group row">
  <label for="example-text-input" className="col-2 col-form-label">Area</label>
  <div className="col-8">
    <input className="form-control" type="search" placeholder="ex: Banjara Hills" id="area"/>
  </div>
</div>
<div className="form-group row">
  <label for="example-text-input" className="col-2 col-form-label">Address</label>
  <div className="col-8">
    <input className="form-control" type="search" placeholder="ex: Road 3,Banjara Hills, Hyderabad" id="address"/>
  </div>
</div>
 <div className="form-group row">
  <label for="example-text-input" className="col-2 col-form-label">Cuisine</label>
  <div className="col-8">
    <input className="form-control" type="search" placeholder="ex: American, Desserts, Cafe" id="cuisine"/>
  </div>
</div>
<div className="form-group row">
 <label for="example-text-input" className="col-2 col-form-label">Description</label>
 <div className="col-8">
   <input className="form-control" type="search" rows="4" placeholder="About ur Bistro" id="descriptn"/>
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
  <div className="col-8">
    <input className="form-control" type="url" placeholder="ex: http://www.hotelexample.com" id="homepageurl" onChange ={this.validate_homepageurl.bind(this)} onKeyUp ={this.validate_homepageurl.bind(this)} onClick={this.validate_homepageurl.bind(this)}/>
  </div>
</div>
<div className="form-group row">
  <label for="example-url-input" className="col-2 col-form-label">Facebook Page URL</label>
  <div className="col-8">
    <input className="form-control" type="url" placeholder="ex :https://www.facebook.com/example" id="fbpageurl" onChange ={this.validate_fbpageurl.bind(this)} onKeyUp ={this.validate_fbpageurl.bind(this)} onClick={this.validate_fbpageurl.bind(this)}/>
  </div>
</div>
<div className="form-group row">
  <label for="example-tel-input" className="col-2 col-form-label">Telephone</label>
  <div className="col-6">
    <input className="form-control" type="tel" placeholder="ex: 1-(555)-555-5555" id="telephone" onChange ={this.validateTelephone.bind(this)} onKeyUp ={this.validateTelephone.bind(this)} onClick={this.validateTelephone.bind(this)}/>
  </div>
</div>
<div className="form-group row">
  <label for="example-text-input" className="col-2 col-form-label">Working Hours</label>
  <div className="col-4">
    <input className="form-control" type="search" placeholder="09:00:00"  id="opening_time" onChange ={this.validateOpening_time.bind(this)} onKeyUp ={this.validateOpening_time.bind(this)} onClick={this.validateOpening_time.bind(this)}/>
  </div>
  -
  <div className="col-4">
     <input className="form-control" type="search" placeholder="10:00:00" id="closing_time" onChange ={this.validateClosing_time.bind(this)} onKeyUp ={this.validateClosing_time.bind(this)} onClick={this.validateClosing_time.bind(this)}/>
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
    <input className="form-control" type="search" placeholder="Per Two" id="cost" onChange ={this.validateCost.bind(this)} onClick={this.validateCost.bind(this)}/>
  </div>
</div>
<div className="form-group row">
  <label for="example-text-input" className="col-2 col-form-label">Latitude</label>
  <div className="col-8">
    <input className="form-control" type="search" value={this.state.lat1} id="lat" onChange ={this.validateLat.bind(this)} onClick={this.validateLat.bind(this)}/>
  </div>
</div>
<div className="form-group row">
  <label for="example-text-input" className="col-2 col-form-label" >Longitude</label>
  <div className="col-8">
    <input className="form-control" type="search" value={this.state.lon1} id="long" onChange ={this.validateLong.bind(this)} onClick={this.validateLong.bind(this)}/>
  </div>
</div>
<div className="form-group row">
    <label for="exampleInputFile" className="col-2 col-form-label">Image</label>
    <div className="col-8">
       <input type="file" class="form-control-file" id="FileUpload" name="image" aria-describedby="fileHelp" onChange={this.onChange}/>
       <small id="fileHelp" className="form-text text-muted">Browse Image file location </small>
    </div>
  </div>
<div className="form-group-row">
    <div className="col-4">
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

  <div id="pop_homepageurl">
        <Popover placement="right" isOpen={this.state.popoverOpen1} target="homepageurl" toggle={this.toggle1}>
          <PopoverContent>Please enter in "http://www.hotelexample.com" format</PopoverContent>
        </Popover>
      </div>

      <div id="pop_fbpageurl">
        <Popover placement="right" isOpen={this.state.popoverOpen2} target="fbpageurl" toggle={this.toggle2}>
          <PopoverContent>Please enter in "https://www.facebook.com/example" format</PopoverContent>
        </Popover>
      </div>

      <div id="pop_telephone">
        <Popover placement="right" isOpen={this.state.popoverOpen3} target="telephone" toggle={this.toggle3}>
          <PopoverContent>Telephone no. should of 10 numbers</PopoverContent>
        </Popover>
      </div>

      <div id="pop_opening_time">
        <Popover placement="right" isOpen={this.state.popoverOpen4} target="opening_time" toggle={this.toggle4}>
          <PopoverContent>Please enter Opening time in HH:mm:ss format</PopoverContent>
        </Popover>
      </div>

      <div id="pop_closing_time">
        <Popover placement="right" isOpen={this.state.popoverOpen5} target="closing_time" toggle={this.toggle5}>
          <PopoverContent>Please enter Closing time in HH:mm:ss format</PopoverContent>
        </Popover>
        </div>

         <div id="pop_cost">
        <Popover placement="right" isOpen={this.state.popoverOpen6} target="cost" toggle={this.toggle6}>
          <PopoverContent>Cost should be in numerals</PopoverContent>
        </Popover>
      </div>

       <div id="pop_lat">
        <Popover placement="right" isOpen={this.state.popoverOpen7} target="lat" toggle={this.toggle7}>
          <PopoverContent>Please place marker on the map to get the location</PopoverContent>
        </Popover>
      </div>

       <div id="pop_long">
        <Popover placement="right" isOpen={this.state.popoverOpen8} target="long" toggle={this.toggle8}>
          <PopoverContent>Please place marker on the map to get the location</PopoverContent>
        </Popover>
      </div>

      <div id="pop_FileUpload">
        <Popover placement="right" isOpen={this.state.popoverOpen9} target="FileUpload" toggle={this.toggle9}>
          <PopoverContent>Please select a file</PopoverContent>
        </Popover>
      </div>

</div>
       );
   }
 }

export default AddRest;
