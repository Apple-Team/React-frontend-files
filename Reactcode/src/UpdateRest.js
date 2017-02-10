import React, { Component } from 'react';
import {Link} from 'react-router';
// webpack.config.js specifies index.js as the entry point, and
// index.js imports and renders this `App` component.

class UpdateRest extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another className
    super();
     console.log('test');
  }

   componentDidMount(){
     fetch("http://localhost:9000/list_of_all_restaurants")
            .then((response) => response.json())
            .then((responseJson) => {
               this.setState({
                data: responseJson

               });
            });
  }

   handleUpdate(id){
    this.id=id;
    fetch('http://localhost:9000/rest'+ id,
      {
        headers :{
          "Content-Type" : "application/json"
        },
      method: "PUT"
     })
     .then(function (data) {
  alert('Updated in the database',data);
  })
  .catch(function (error) {
  alert('Not updated in the database',error);
  });
 }


 render() {
    // console.log('The App component was rendered')
    return(
       <div className="card card-block">{
      this.state.data.map(function(data, index) {
            return (
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
  <option value="1">Breakfast</option>
  <option value="2">Sunday Brunch</option>
  <option value="3">Fine Dine</option>
  <option value="3">Barbeque</option>
  <option value="3">Frozen Delight</option>
  <option value="3">Street Food</option>
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
    <label for="exampleInputFile" className="col-2 col-form-label">Image</label>
    <div className="col-6">
       <input type="file" class="form-control-file" id="FileUpload" aria-describedby="fileHelp"/>
       <small id="fileHelp" className="form-text text-muted">Browse Image file location </small>
    </div>
  </div>
<div className="form-group-row">
    <div className="col-6">
      <button type="button" className="btn btn-warning" onClick={this.handleUpdate.bind(this,index)}>Submit</button>
    </div>
</div>
</div>
)})}
</div>
      );
  }
}
export default UpdateRest;
