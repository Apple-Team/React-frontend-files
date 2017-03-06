import React, { Component } from 'react';
import {Link,hashHistory} from 'react-router';
import AdminHeader from './AdminHeader';

class AddCollection extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another className
    super();

    this.state = {
    imgSrc:'',
    image_data:[],
  };
  	 this.handleClick=this.handleClick.bind(this);

    this.handleUpload = this.handleUpload.bind(this);
    this.onChange= this.onChange.bind(this);
    console.log('test');
  }


  handleClick(ev){
    fetch('http://localhost:9000/collection',
      {
        headers :{
          "Content-Type" : "application/json"
        },
      method: "POST",
       body: JSON.stringify({
                              "collection": document.getElementById('name').value,
                              "collectionUrl": this.state.image_data

                            })
     })
      window.location.reload();
     hashHistory.push('/ViewCollection/');
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

    <div  className="container">
     <div className="card card-block" id="redirect">
    <div className="row">
    <div className="col col-sm-6">
 <div className="form-group row">
  <label className="col-2 col-form-label">Name</label>
  <div className="col-6">
    <input className="form-control" name="username" type="search" placeholder="Collection Name" id="name"/>
  </div>
</div>
<div className="form-group row">
    <label for="exampleInputFile" className="col-2 col-form-label">Image</label>
    <div className="col-6">
       <input type="file" class="form-control-file" id="FileUpload" name="image" aria-describedby="fileHelp" onChange={this.onChange}/>
       <small id="fileHelp" className="form-text text-muted">Browse Image file location </small>
       <button type="button" className="btn btn-warning btn-sm" onClick={this.handleUpload}>Upload</button>
    </div>
  </div>
<div className="form-group-row">
    <div className="col-6">
      <button type="button" className="btn btn-warning" onClick={this.handleClick.bind(this)}>Submit</button>
    </div>
</div>

</div>

<img src={this.state.imgSrc}  />

</div>
</div>
</div>



</div>
);
   }
 }

export default AddCollection;