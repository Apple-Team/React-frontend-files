import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Badge } from 'reactstrap';
import UserHeader from './UserHeader';
import { Router, Route, hashHistory } from 'react-router';
import Collection from './collection';
import Footer from './Footer';
import Header from './Header';
import Search from './Search';
import NearBy from './NearBy';
import MainView from './MainView';
import SearchComponent from './SearchComponent';

import './App.css';
import './animate.min.css';

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
              <div className="wow animated fadeInUpBig" style={{paddingTop:"-20px"}}><img src={require('./images/bday123.png')} />
                <br />
                <h2> <Badge color="warning"> We Found a Best place to Celebrate your Birthday</Badge></h2>
             </div>

          <div id="srchcard" className="card" style={{paddingRight:"10px"}} id="random_rest">
            <div className="row" id="srch">
             <div className="col">
              <img id="srchimg" src={this.state.data.image} id="srchimg" alt="Card image cap"/>
             </div>
             <div className="col-md-6" id="srchcard1">
                <div className="card-top">
                <br />
                  <h5 className="card-subtitle"><span id="stext"> {this.state.data.name}</span></h5><br/>

                  <span id="subtext"> {this.state.data.area}</span><br/>
                  <hr />
                </div>
                <div id="srch">
                  <button type="button" className="btn btn-warning btn-sm" onClick={()=>this.handleRest(this.state.data.id)}>View</button>
                </div>
             </div>
          </div>
              </div>
             </div>
             </div>

             </div>

            <Collection />
            <div className="text-center"><a href="#tf-home" className="fa fa-angle-up fa-3x"></a></div>

         <Footer />
         </div>
      )
   }
}

export default UserHome;
