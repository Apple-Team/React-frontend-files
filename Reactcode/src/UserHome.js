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
  componentWillMount(){
    
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
                });         
          
       
     console.log(that.state.data);
     document.getElementById('bdaycard').style.display="block";
     }
  });
}

  handleRest(id)
{
 this.id=id;
 hashHistory.push('/Restaurant_detail/'+id)
}
     render() {
      return (
        <div id="dd">
         <UserHeader />
         <div id="home">
         <div id="tf-home" className="text-center">
         <SearchComponent />
             <div className="overlay">
                     <a href="#tf-collection" className="fa fa-angle-down page-scroll"></a>
             </div>
         </div>
         <div id="ss" >
            <div id="bdaycard" style={{display:"none"}}>
              <div className="col" >
           
              <b><i style={{padding:"100px 100px 50px 50px",fontSize:"24px",float:"left",color:"#fff"}}> Happy Birthday!!<br/> We Found a Best place to Celebrate your Birthday </i></b>
              </div>

              <div className="col" style={{paddingTop:"40px"}}>
                <div id="srchcard"  className="card w-100 text-center">
                   <div className="row" id="srch">
                     <div className="col-md-6">
                       <img id="srchimg" src={this.state.data.image} id="srchimg" alt="Card image cap"/>
                     </div>
                     <div className="col-md-6" id="srchcard1">
                         <div className="card-top">
                           <h5 className="card-subtitle">{this.state.data.name}</h5>
                           <p className="card-text"> Area: {this.state.data.area}</p>
                           <p className="card-text">  Working Hours: {this.state.data.workHours}</p>
                         </div><hr/>
                         <div className="card-bottom" id="srch">
                           <button type="button" className="btn btn-warning btn-sm"  style={{float:"right"}} onClick={()=>this.handleRest(this.state.data.id)}>View</button>
                         </div>
                     </div>
                   </div>
                </div>
              
             </div>
             </div>
            <Collection />
            <div className="text-center"><a href="#tf-home" className="fa fa-angle-up fa-3x"></a></div>
         </div>
         <Footer />
         </div>
       </div>
      )
   }
}

export default UserHome;