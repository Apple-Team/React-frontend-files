import React from 'react';
import ReactDOM from 'react-dom';
import 'isomorphic-fetch';
import { Router, Route, hashHistory } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';


import App from './App';
import Collection from './collection';
import Login from './Login';
import Logout from './Logout';
import Signup from './Signup';
import Search from './Search';
import SearchComponent from './SearchComponent';
import NearBy from './NearBy';



import Admin from './Admin';
import AdminHeader from './AdminHeader';
import UserHeader from './UserHeader';
import UserHome from './UserHome';
import AddRest from './AddRest';
import ViewRest from './ViewRest';
import UpdateRest from './UpdateRest';
import Restaurant_detail from './Restaurant_detail';
import rl from './rl';
import Collectionfetch from './Collectionfetch';
import collection from './collection';
import AckHeader from './AckHeader'


import ViewCollection from './ViewCollection';
import AddCollection from './AddCollection';

import Maps from './Maps';
import StaticMap from './StaticMap';
import MapDirections from './MapDirections';
import UnAuth from './UnAuth';




ReactDOM.render(

   <Router history={hashHistory}>


 	  <Route path="/" component={App}/>
 	  <Route path="/home" component={App}/>
 	  <Route path="/Login" component={Login}/>
 	  <Route path="/Signup" component={Signup}/>
 	  <Route path="/map" component={Maps}/>
 	  <Route path="/StaticMap" component={StaticMap}/>
 	  <Route path="/Logout" component={Logout}/>
 	  <Route path="/Search/:s/:key/:count" component={Search}/>
 	  <Route path="/NearBy/:lati/:longi" component={NearBy}/>
 	  <Route path="/Restaurant_detail/:id" component={Restaurant_detail}/>
 	  <Route path="/rl/:id/:lat/:long" component={rl}/>
 	  <Route path="/ViewRest" component={ViewRest}/>
 	  <Route path="/ViewCollection" component={ViewCollection}/>
	  <Route path="/AddRest" component={AddRest}/>
	  <Route path="/AddCollection" component={AddCollection}/>
	  <Route path="/UpdateRest/:index" component={UpdateRest}/>
    <Route path="/collection" component={collection}/>
	  <Route path="/Collectionfetch/:name" component={Collectionfetch}/>
    <Route path="/AdminHeader" component={AdminHeader}/>
    <Route path="/AckHeader" component={AckHeader}/>
    <Route path="/UserHome" component={UserHome}/>
    <Route path="/UnAuth" component={UnAuth}/>

	  <Route path="/Admin/:name" component={Admin}>
	  		<Route path="/ViewRest" component={ViewRest}/>
	    	<Route path="/AddRest" component={AddRest}/>
	  </Route>




   </Router>,
  document.getElementById('root')
);
