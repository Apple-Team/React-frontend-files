import React, { Component } from 'react';
import { Link,hashHistory } from 'react-router';
import ReactDOM from 'react-dom';
import AdminHeader from './AdminHeader';
class ViewCollection extends Component {
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

    fetch("http://localhost:9000/get_all_collections")
            .then((response) => response.json())
            .then((responseJson) => {
               this.setState({
                data: responseJson

               });
            });

    }

  handleCollection(name)
{
  this.name=name;
  
  hashHistory.push('/Collectionfetch/'+name);

}

 handleDelete(cname){
   console.log(cname);
   if (window.confirm("Do you really want to Delete?")) {
    fetch('http://localhost:9000/delete_collection/'+cname,
      {
        headers :{
          "Content-Type" : "application/json",
          "Accept" : "application/json"
        },
      method: "DELETE"
     })
     .then(function (data) {
  window.location.reload();
  hashHistory.push('/ViewCollection/');
  })
  .catch(function (error) {
  alert('Not deleted from the database',error);
  });
 }
}


render() {

   return(
  <div id="content4">
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
              <img className="d-flex mr-3" src={data.collectionUrl} height="100px" width="110px" alt="Generic placeholder image"/>
              <div className="media-body">
                   <p className="card-text"><h3 className="mt-0 mb-1">{data.collection}</h3>
                   </p>
              </div>
              <button type="button" className="btn btn-warning btn-sm" onClick={() => this.handleCollection(data.collection)}>View this Collection</button>&nbsp;
              <button type="button" className="btn btn-danger btn-sm" onClick={() => this.handleDelete(data.collection)}>Delete</button>
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

 export default ViewCollection;