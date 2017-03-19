import React, { Component } from 'react';
import {Link,hashHistory } from 'react-router';
import ReactDOM from 'react-dom';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import './Signup.css';
import Admin from './Admin';


// webpack.config.js specifies index.js as the entry point, and
// index.js imports and renders this `App` component.

class Header extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another className

    super();
    this.state = { data: [] };

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

      <Navbar toggleable id="Header">
          <NavbarToggler right onClick={this.toggle}><i className="fa fa-bars fa-2x" style={{color:"#fcac46"}} aria-hidden="true"></i></NavbarToggler>
          <NavbarBrand href="/">
          <img id="logo" width="50" height="50" className="d-inline-block align-center" />Find'O Bistro</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/" className="nav-link"><b>Home</b></Link>
              </NavItem>
              <NavItem>
                <Link to="/collection" className="nav-link"><b>Collections</b></Link>
              </NavItem>
              <NavItem>
                <Link to="/Signup" className="nav-link"><i className="fa fa-sign-in" aria-hidden="true"></i><b>SIGN UP</b></Link>
              </NavItem>
              <NavItem>
              <Link to="/Login" className="nav-link"><i className="fa fa-user" aria-hidden="true"></i><b> SIGN IN</b></Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
  </div>
  </div>

    );

   }
 }

export default Header;
