import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';
import Restaurant_detail from './Restaurant_detail';
import UpdateRest from './UpdateRest';
import AddRest from './AddRest';
import './ViewRest.css';
// webpack.config.js specifies index.js as the entry point, and
// index.js imports and renders this `App` component.

class ViewRest extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another className
    super();

    this.state = { data: [],
    data: [],
    get_data: []
  };

    console.log('test');
  }

  componentWillMount(){
     fetch("http://localhost:9000/list_of_all_restaurants")
            .then((response) => response.json())
            .then((responseJson) => {
               this.setState({
                data: responseJson

               });
            });
  }

   handleDelete(id){
   console.log(id);
   if (window.confirm("Do you really want to Delete?")) {
    fetch('http://localhost:9000/rest/'+id,
      {
        headers :{
          "Content-Type" : "application/json",
          "Accept" : "application/json"
        },
      method: "DELETE"
     })
     .then(function (data) {
  alert('Deleted from the database',id);
  window.location.reload()
  })
  .catch(function (error) {
  alert('Not deleted from the database',error);
  });
 }
}
handleRest(id)
{
  this.id=id;
  var c=document.getElementById("content");  
  ReactDOM.render(<Restaurant_detail index={id}/>,c);

}
handleGet(id){
  this.id=id;
  fetch("http://localhost:9000/restaurants_by_id/"+id)
         .then((response) => response.json())
         .then((responseJson) => {
            this.setState({
             get_data: responseJson

            });
         });
  console.log(this.state.get_data);
  document.getElementById('Update').style.display = "block";
}

 handleUpdate(id){
  this.id=id;
  fetch('http://localhost:9000/rest/'+ id,
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
                           "homePage": document.getElementById('homepageurl').value,
                           "fbUrl": document.getElementById('fbpageurl').value,
                           "number": document.getElementById('telephone').value,
                           "latitude": document.getElementById('lat').value,
                           "longitude": document.getElementById('long').value,
                           "workHours": document.getElementById('working hours').value,
                           "image": document.getElementById('FileUpload').value

                         })
   })
   .then((response) => response.json())
   .then((responseJson) => {
      this.setState({
       data1: responseJson

      });
   });
   alert('Added into the database',this.state.data1);
   console.log(this.state.data1);
   document.getElementById('Update').style.display = "block";
 }




  // `render` is called whenever the component's props OR state are updated.
  render() {

   return( 
  <div id="content">
 
    <div className="card card-block">{
      this.state.data.map((data, index) => {
        return (
         <ul>
            <li className="media">
              <img className="d-flex mr-3" src={data.image} height="100px" width="110px" alt="Generic placeholder image"/>
              <div className="media-body">
                   <p className="card-text"><h5 className="mt-0 mb-1">{data.name}</h5>
                      Area: {data.area}<br />
                      Working Hours: {data.workHours}
                   </p>
              </div>
              <button type="button" className="btn btn-warning btn-sm" onClick={() => this.handleRest(data.id)}>View Restaurant Page</button>&nbsp;
              <button type="button" className="btn btn-warning btn-sm" onClick={() => this.handleGet(data.id)}>Update</button>&nbsp;
              <button type="button" className="btn btn-danger btn-sm" onClick={() => this.handleDelete(data.id)}>Delete</button>
            </li>
          </ul>
        )}
      )}
    </div>

  <div id="Update" className="modal" >
    <div className="container">
      <div className="form-group row">
         <label className="col-2 col-form-label">Name</label>
            <div className="col-6">
              <input className="form-control" name="name" type="search" defaultValue={this.state.get_data.name} id="name"/>
             </div>
      </div>
  <div className="form-group row">
    <label for="example-text-input" className="col-2 col-form-label">Area</label>
    <div className="col-6">
       <input className="form-control" type="search" value={this.state.get_data.area} id="area"/>
    </div>
  </div>
  <div className="form-group row">
    <label for="example-text-input" className="col-2 col-form-label">Address</label>
    <div className="col-6">
      <input className="form-control" type="search" value={this.state.get_data.address} id="address"/>
    </div>
  </div>
   <div className="form-group row">
    <label for="example-text-input" className="col-2 col-form-label">Cuisine</label>
    <div className="col-6">
      <input className="form-control" type="search" value={this.state.get_data.cuisine} id="cuisine"/>
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
      <input className="form-control" type="url" value={this.state.get_data.homePage} id="homepageurl"/>
    </div>
  </div>
  <div className="form-group row">
    <label for="example-url-input" className="col-2 col-form-label">Facebook Page URL</label>
    <div className="col-6">
      <input className="form-control" type="url" value={this.state.get_data.fbUrl} id="fbpageurl"/>
    </div>
  </div>
  <div className="form-group row">
    <label for="example-tel-input" className="col-2 col-form-label">Telephone</label>
    <div className="col-6">
      <input className="form-control" type="tel" value={this.state.get_data.number} id="telephone"/>
    </div>
  </div>
  <div className="form-group row">
    <label for="example-text-input" className="col-2 col-form-label">Working Hours</label>
    <div className="col-6">
      <input className="form-control" type="search" value={this.state.get_data.workHours} id="working hours"/>
    </div>
  </div>
  <div className="form-group row">
    <label for="example-text-input" className="col-2 col-form-label">Latitude</label>
    <div className="col-6">
      <input className="form-control" type="search" value={this.state.get_data.latitude} id="lat"/>
    </div>
  </div>
  <div className="form-group row">
    <label for="example-text-input" className="col-2 col-form-label">Longitude</label>
    <div className="col-6">
      <input className="form-control" type="search" value={this.state.get_data.longitude} id="long"/>
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
        <button type="button" className="btn btn-warning" onClick={() => this.handleUpdate(this.state.get_data.id)}>Submit</button>
      </div>
  </div>


  </div>
  </div>

  </div>
  );
     }
   }

  export default ViewRest;
