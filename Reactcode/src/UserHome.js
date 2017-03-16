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
    }).then((response) => response.json())
         .then((responseJson) => {
            that.setState({
             data: responseJson
           });
         }).then(function(e){

           console.log(that.state.data);
     document.getElementById('bday').style.display="block";
    });
  }
  handleRest(id)
{
 this.id=id;
 hashHistory.push('/Restaurant_detail/'+id)
}
     render() {
       var that=this;
       console.log(that.state.data.name);
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
         <div id="ss">
            <div id="bday" classNAme="row" style={{display: 'none'}}>
              <div className="col"><i style={{padding:"50px 200px 50px 50px",fontSize:"22px",float:"left"}}>We Found a Best place to Celebrate your Birthday </i></div>

              <div className="col">
                <div id="srchcard"  className="card w-100">
                   <div className="row" id="srch">
                     <div className="col-md-6">
                       <img id="srchimg" src={that.state.data.image} id="srchimg" alt="Card image cap"/>
                     </div>
                     <div className="col-md-6" id="srchcard1">
                         <div className="card-top">
                           <h5 className="card-subtitle">{that.state.data.name}</h5>
                           <p className="card-text"> Area: {that.state.data.area}</p>
                           <p className="card-text">  Working Hours: {that.state.data.workHours}</p>
                         </div><hr/>
                         <div className="card-bottom" id="srch">
                           <button type="button" className="btn btn-warning btn-sm"  style={{float:"right"}} onClick={()=>that.handleRest(that.state.data.id)}>View</button>
                         </div>
                     </div>
                   </div>
                </div>
                <hr />
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
