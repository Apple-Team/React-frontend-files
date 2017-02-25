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
import Signup from './Signup';
import Search from './Search';



import Admin from './Admin';
import AdminHeader from './AdminHeader';
import AddRest from './AddRest';
import ViewRest from './ViewRest';
import UpdateRest from './UpdateRest';
import Restaurant_detail from './Restaurant_detail';
import Collectionfetch from './Collectionfetch';
import Logout from './Logout';

import Maps from './Maps';
import StaticMap from './StaticMap';




ReactDOM.render(

   <Router history={hashHistory}>


 	  <Route path="/" component={App}/>
 	  <Route path="/home" component={App}/>
 	  <Route path="/login" component={form}/>
 	  <Route path="/Signup" component={Signup}/>
 	  <Route path="/map" component={Maps}/>
 	  <Route path="/StaticMap" component={StaticMap}/>
 	  <Route path="/Logout" component={Logout}/>
 	  <Route path="/Search/:s" component={Search}/>
 	  <Route path="/Restaurant_detail/:id" component={Restaurant_detail}/>
 	  <Route path="/ViewRest" component={ViewRest}/>
	  <Route path="/AddRest" component={AddRest}/>
	  <Route path="/UpdateRest/:index" component={UpdateRest}/>
	  <Route path="/Collectionfetch/:name" component={Collectionfetch}/>
    <Route path="/AdminHeader" component={AdminHeader}/>

	  <Route path="/Admin/:name" component={Admin}>
	  		<Route path="/ViewRest" component={ViewRest}/>
	    	<Route path="/AddRest" component={AddRest}/>
	  </Route>




   </Router>,
  document.getElementById('root')
);
