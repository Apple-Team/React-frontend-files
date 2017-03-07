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

     render() {
       console.log(window.sessionStorage.getItem('token'));
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
