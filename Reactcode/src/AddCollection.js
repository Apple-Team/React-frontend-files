import React, { Component } from 'react';
import {Link,hashHistory} from 'react-router';
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';
import AdminHeader from './AdminHeader';

class AddCollection extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another className
    super();

    this.state = {
    imgSrc:'',
    image_data:[],
    popoverOpen1: false,
    popoverOpen2: false
  };
  	 this.handleClick=this.handleClick.bind(this);
    this.toggle1 = this.toggle1.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.onChange= this.onChange.bind(this);
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


  handleClick(ev){
    var tok=window.sessionStorage.getItem('token');
     var formData = new FormData();
     var that=this;
      var photo=document.getElementById('FileUpload').files[0];
      console.log(photo);
      if((photo==undefined)||(document.getElementById('name').value=='')){

        if(photo==undefined){
        that.setState({
      popoverOpen2:true
    });
      }

       if(document.getElementById('name').value==''){
        that.setState({
      popoverOpen1:true
    });
      }

    }
      else{
        that.setState({
      popoverOpen1:false,
      popoverOpen2:false
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
    fetch('http://localhost:9000/collection',
      {
        headers :{
          "Content-Type" : "application/json",
           "Authorization": "Bearer "+tok
        },
      method: "POST",
       body: JSON.stringify({
                              "collection": document.getElementById('name').value,
                              "collectionUrl": that.state.image_data

                            })
     }).then(response=>{
       if(200==response.status){
          window.location.reload();
          hashHistory.push('/ViewCollection/');
        }
        else if (403==response.status) {
        window.alert("Forbidden!!");
        }
        else{
            window.alert("please register!!");
        }
      });
    });
    }
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


 render() {
   console.log(this.state.image_data);
    // console.log('The App component was rendered')
    return(
<div  id="content1s">
  <div className="row">
    <div className="col" id="col1">
      <AdminHeader />
    </div>
  </div>
  <div className="card card-block">
    <div  className="container" >
      <div className="row" style={{paddingLeft:"10%"}}>
        <div className="col col-sm-6 ">

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

 <div id="pop_colname">
        <Popover placement="right" isOpen={this.state.popoverOpen1} target="name" toggle={this.toggle1}>
          <PopoverContent>Select a collection name</PopoverContent>
        </Popover>
      </div>

      <div id="pop_file">
        <Popover placement="right" isOpen={this.state.popoverOpen2} target="FileUpload" toggle={this.toggle2}>
          <PopoverContent>Please select a file</PopoverContent>
        </Popover>
      </div>

</div>
);
   }
 }

export default AddCollection;
