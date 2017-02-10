import React, { Component } from 'react';
import {Link} from 'react-router';
// webpack.config.js specifies index.js as the entry point, and
// index.js imports and renders this `App` component.

class AddRest extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another className
    super();
    this.state = { data: [] };
    this.handleClick=this.handleClick.bind(this);
    console.log('test');
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

  // `render` is called whenever the component's props OR state are updated.
  render() {
    // console.log('The App component was rendered')
    return(
<div  className="container" >
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
    <input className="form-control" type="search" placeholder="" id="lat"/>
  </div>
</div>
<div className="form-group row">
  <label for="example-text-input" className="col-2 col-form-label">Longitude</label>
  <div className="col-6">
    <input className="form-control" type="search" placeholder="" id="long"/>
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
       );
   }
 }

export default AddRest;
