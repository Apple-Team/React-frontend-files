import React from 'react';
import ReactDOM from 'react-dom';
import 'isomorphic-fetch';
import { Router, Route, hashHistory } from 'react-router';
import './bootstrap-4.0.0-alpha.6-dist/css/bootstrap.css';
import './font-awesome/css/font-awesome.css';


import App from './App';
import Collection from './collection';
import Login from './Login';
import form from './form';
import SignUp_admin from './SignUp_admin';
import SignUp_user from './SignUp_user';
import Signup from './Signup';

import SundayBrunch from './SundayBrunch';
import FrozenDelight from './FrozenDelight';
import Breakfast from './Breakfast';
import StreetFood from './StreetFood';


import Admin from './Admin';
import AddRest from './AddRest';
import ViewRest from './ViewRest';

import Maps from './Maps';




ReactDOM.render(

   <Router history={hashHistory}>


 	  <Route path="/" component={App}/>
 	  <Route path="/home" component={App}/>
 	  <Route path="/login" component={form}/>
 	  <Route path="/sb" component={SundayBrunch}/>
 	  <Route path="/fd" component={FrozenDelight}/>
 	  <Route path="/bf" component={Breakfast}/>
 	  <Route path="/sf" component={StreetFood}/>
 	  <Route path="/Signup" component={Signup}/>
 	  <Route path="/SignUp_admin" component={SignUp_admin}/>
 	  <Route path="/SignUp_user" component={SignUp_user}/>

 	  <Route path="/map" component={Maps}/>


	  <Route path="/Admin" component={Admin}>
	    <Route path="/ViewRest" component={ViewRest}/>
	    <Route path="/AddRest" component={AddRest}/>
      </Route>


   </Router>,
  document.getElementById('root')
);
