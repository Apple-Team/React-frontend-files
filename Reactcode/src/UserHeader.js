import React, { Component } from 'react';
import {Link,hashHistory } from 'react-router';
import ReactDOM from 'react-dom';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import './Signup.css';
import Admin from './Admin';


// webpack.config.js specifies index.js as the entry point, and
// index.js imports and renders this `App` component.

class UserHeader extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another className

    super();
    this.state = { data: [] };
    this.handleLogout = this.handleLogout.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,data:[]
    };

    console.log('test');

  }
  componentWillMount(){

  fetch("http://localhost:9000/images/5498f7c0-ca2f-44b4-826c-0deb07521b20")
	.then(function(response) {
	  return response.blob();
	})
	.then(function(imageBlob) {
	  document.getElementById('logo').src = URL.createObjectURL(imageBlob);
	});
}

  handleLogout(){
      console.log(window.sessionStorage.getItem('token'));

      window.sessionStorage.removeItem('token');
      window.sessionStorage.clear();
      hashHistory.push('/home');
    }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  // `render` is called whenever the component's props OR state are updated.
render() {

return(
  <div>
  <div className="tf-nav">

      <Navbar fixed="top" toggleable>
          <NavbarToggler right onClick={this.toggle}><i className="fa fa-bars fa-2x" aria-hidden="true"></i></NavbarToggler>
          <NavbarBrand href="/">
          <img id="logo" width="60" height="60" className="d-inline-block align-center" />FindO Bistro</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="#"><b>Home</b></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#tf-collection"><b>Collections</b></NavLink>
              </NavItem>
              <NavItem>
                <div style={{color:"#000000"}}><button type="button" className="btn btn-secondary" onClick={this.handleLogout}>LOGOUT</button></div>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
  </div>
  </div>

    );

   }
 }

export default UserHeader;
