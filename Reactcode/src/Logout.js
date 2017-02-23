import React, { Component } from 'react';
import {Router, Route, hashHistory,Link} from 'react-router';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Header from './Header';
import './Admin.css';
// webpack.config.js specifies index.js as the entry point, and
// index.js imports and renders this `App` component.


class Logout extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another className
    super();
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  // `render` is called whenever the component's props OR state are updated.
  render() {
    // console.log('The App component was rendered')
 	 	return(
 	 	<div id="tf-home" >
        
          <Header />
            <div className="row">
                <div className="col" id="col2">
                    	<div className="content">
                			
                				<x2>Successfully Loggged out!<br /></x2>
                        <x>Thanks for visiting our website..</x>
                				
                				</div>
                			
                </div>
            </div>
    
     </div>




 	 );
 	}
   }
   export default Logout;