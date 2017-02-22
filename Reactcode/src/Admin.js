import React, { Component } from 'react';
import {Router, Route, hashHistory,Link} from 'react-router';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import './Admin.css';
// webpack.config.js specifies index.js as the entry point, and
// index.js imports and renders this `App` component.


class Admin extends Component {
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
 	 	<div className="wrapper" >
          <div className="overlay">
             <div className="row">       
               <div className="col" id="col1">                    
                  <Navbar fixed="top" toggleable id="adminHeader">
                     <NavbarToggler right onClick={this.toggle} />
                         <NavbarBrand href="/">
                           <img src={require('./images/logo.png')} width="60" height="60" className="d-inline-block align-center" />Find'O Bistro</NavbarBrand>
                           <Collapse isOpen={this.state.isOpen} navbar>
                              <Nav className="ml-auto" navbar>
                                <NavItem>
                                  <Link to="/ViewRest" className="nav-link" >View All Restaurants</Link>
                                </NavItem>
                                <NavItem>
                                  <Link to="/AddRest" className="nav-link" >Add Restaurant</Link>
                                </NavItem>
                                <NavItem>
                                  <Link to ="/Admin" className="nav-link">Logout</Link>
                                 </NavItem>
                              </Nav>
                           </Collapse>
                        </Navbar>
                 </div>
             </div>
            <div className="row">
                <div className="col" id="col2">
                    	<div className="content">
                			<div className="txt1">
                				Welcome to Find'O Bistro,
                				     <br/>{this.props.params.name}!!
                				</div>
                				</div>
                			
                </div>
            </div>
        </div>
     </div>




 	 );
 	}
   }
   export default Admin;