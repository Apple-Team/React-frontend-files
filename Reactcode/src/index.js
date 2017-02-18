import React from 'react';
import ReactDOM from 'react-dom';
import 'isomorphic-fetch';
import { Router, Route, hashHistory } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';


import App from './App';
import Collection from './collection';
import Login from './Login';
import form from './form';
import SignUp_admin from './SignUp_admin';
import SignUp_user from './SignUp_user';
import Signup from './Signup';
import Search from './Search';



import Admin from './Admin';
import AddRest from './AddRest';
import ViewRest from './ViewRest';
import UpdateRest from './UpdateRest';
import Restaurant_detail from './Restaurant_detail';


import Maps from './Maps';




ReactDOM.render(

   <Router history={hashHistory}>


 	  <Route path="/" component={App}/>
 	  <Route path="/home" component={App}/>
 	  <Route path="/login" component={form}/>
 	  <Route path="/Signup" component={Signup}/>
 	  <Route path="/SignUp_admin" component={SignUp_admin}/>
 	  <Route path="/SignUp_user" component={SignUp_user}/>
 	  <Route path="/map" component={Maps}/>
 	  <Route path="/Search" component={Search}/>
 	  <Route path="/Restaurant_detail" component={Restaurant_detail}/>
 	  <Route path="/ViewRest" component={ViewRest}/>
	    	<Route path="/AddRest" component={AddRest}/>
	  
	  <Route path="/Admin" component={Admin}>
	  		<Route path="/ViewRest" component={ViewRest}/>
	    	<Route path="/AddRest" component={AddRest}/>
	    	<Route path="/UpdateRest" component={UpdateRest}/>
	  </Route>
	    
      


   </Router>,
  document.getElementById('root')
);
