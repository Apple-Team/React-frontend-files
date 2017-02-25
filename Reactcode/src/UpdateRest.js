import React, { Component } from 'react';
import {Link,hashHistory} from 'react-router';
import AdminHeader from './AdminHeader';
// webpack.config.js specifies index.js as the entry point, and
// index.js imports and renders this `App` component.

class UpdateRest extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another className
    super();

    this.state = {
    data1: [],
    get_data: [],
    image_data:[]
  };
      this.handleUpload = this.handleUpload.bind(this);

     console.log('test');
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
  var head;


  componentWillMount(){
  fetch("http://localhost:9000/restaurants_by_id/"+this.props.params.index)
         .then((response) => response.json())
         .then((responseJson) => {
            this.setState({
             get_data: responseJson

            });
         });
  console.log(this.state.get_data);
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
                           "latitude": docume0nt.getElementById('lat').value,
                           "longitude": document.getElementById('long').value,
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
   window.location.reload();
 }

 handleChange(event){
  this.setState({get_data: event.target.value});
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




<div className="container">
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
      <input type="text" value={this.state.get_data.latitude} onChange={this.handleChange} id="lat"/>
    </div>
  </div>
  <div className="form-group row">
    <label for="example-text-input" className="col-2 col-form-label">Longitude</label>
    <div className="col-6">
      <input type="text" value={this.state.get_data.longitude} onChange={this.handleChange} id="long"/>
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
</div>


</div>
      );
  }
}
export default UpdateRest;
