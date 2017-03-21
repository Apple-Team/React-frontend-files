import React, { Component } from 'react';
import { Link,hashHistory } from 'react-router';
import ReactDOM from 'react-dom';
import Restaurant_detail from './Restaurant_detail';
import UpdateRest from './UpdateRest';
import AddRest from './AddRest';
import AdminHeader from './AdminHeader';
import './Admin.css';
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
  console.log(window.sessionStorage.getItem('token'));
  var tok=window.sessionStorage.getItem('token');
     fetch("http://localhost:9000/list_of_all_restaurants",{
       headers: {
           "Content-Type": "application/json",
           "Authorization": "Bearer "+tok
         }
     }).then(response=>{
       if(200==response.status){
         response.json().then((data)=>{
               this.setState({
                data: data
               });
             });
            }
        else if (403==response.status) {
        window.alert("Forbidden!!");
        }
        else{
            window.alert("please register!!");
        }
      });
}
   handleDelete(id){
   console.log(id);
   var tok=window.sessionStorage.getItem('token');
   if (window.confirm("Do you really want to Delete?")) {
    fetch('http://localhost:9000/rest/'+id,
      {
        headers :{
          "Content-Type" : "application/json",
          "Authorization": "Bearer "+tok
        },
      method: "DELETE"
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
      }).catch(function (error) {
          alert('Not deleted from the database',error);
        });
      }
}
handleRest(id)
{
  this.id=id;
  var c=document.getElementById("content");
  hashHistory.push('/Restaurant_detail/'+id)

}
handleGet(index){
  this.index=index;
  hashHistory.push('/UpdateRest/'+index)
}


 handleChange(event){
  this.setState({get_data: event.target.value});
 }


  // `render` is called whenever the component's props OR state are updated.
  render() {

   return(
  <div >
      <div className="row">
               <div className="col" id="col1">
                    <AdminHeader/>
                 </div>
             </div>
    <div>{
      this.state.data.map((data, index) => {
        return (

         <ul>
          <div className="card card-block" id="redirect">
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
            </div>
          </ul>

        )}
      )}
    </div>



  </div>
  );
     }
   }

  export default ViewRest;
