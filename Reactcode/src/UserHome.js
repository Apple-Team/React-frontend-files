import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import UserHeader from './UserHeader';
import { Router, Route, hashHistory } from 'react-router';
import Collection from './collection';
import Footer from './Footer';
import Header from './Header';
import Search from './Search';
import NearBy from './NearBy';
import SearchComponent from './SearchComponent';

import './App.css';

class UserHome extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another classNameName
    super();
    this.state = { data: [] };
  }
  componentDidMount(){

    var that=this;
     var tok=window.sessionStorage.getItem('token');
    fetch("http://localhost:9000/users/users_dob",
     {
       headers :{
         "Content-Type" : "application/json",
         "Authorization": "Bearer "+tok
       }
    }).then(response=>{
          if(200==response.status){
            response.json().then((data)=>{
                  that.setState({
                    data: data
                  });
                }).then(function(ev){
                  if(that.state.data)
                  document.getElementById('bdaycard').style.display="block";
                });


     console.log(that.state.data);

     }
  });
}

  handleRest(id)
{
 this.id=id;
 hashHistory.push('/Restaurant_detail/'+id)
}
     render() {

       console.log(this.state.data.name);
      return (
        <div id="dd">
         <UserHeader />
         <div id="home">
         <div id="tf-home" className="text-center">
         <SearchComponent />


            <div id="bdaycard" className="row" style={{display:"none"}}>
              <div className="col col-md-10" >
                 <b><i style={{padding:"100px 100px 50px 50px",fontSize:"24px",float:"left",color:"#fff"}}> Happy Birthday!!<br/> We Found a Best place to Celebrate your Birthday </i></b>
              </div>
              <div className="col" style={{paddingTop:"30px",paddingRight:"10px"}}>
                  <div className="card">
                      <img className="card-img-top image-fluid" src={this.state.data.image} style={{height:"10rem"}} alt="Card image cap"/>
                      <div className="card-block">
                        <div className="card-subtitle"><b>{this.state.data.name}</b></div><br/>
                        {this.state.data.area}
                         <button type="button" className="btn btn-warning btn-sm"  style={{float:"right"}} onClick={()=>this.handleRest(this.state.data.id)}>View</button>
                       </div>
                  </div>
              </div>
             </div>
             <div className="overlay">
                     <a href="#tf-collection" className="fa fa-angle-down page-scroll"></a>
             </div>
             </div>
            <Collection />
            <div className="text-center"><a href="#tf-home" className="fa fa-angle-up fa-3x"></a></div>

         <Footer />
         </div>
       </div>
      )
   }
}

export default UserHome;
