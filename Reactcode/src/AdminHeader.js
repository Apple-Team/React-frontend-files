import React, { Component } from 'react';
import {Link} from 'react-router';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
class AdminHeader extends Component {
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
render() {

return(
<div>
<Navbar fixed="top" toggleable id="adminHeader">
   <NavbarToggler right onClick={this.toggle} />
       <NavbarBrand href="/">
         <img src={require('./images/logo.png')} width="60" height="60" className="d-inline-block align-center" />FindO Bistro</NavbarBrand>
         <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
               <div style={{color:"#000000"}}><Link to="/ViewRest" className="nav-link" >VIEW ALL RESTAURANTS</Link></div>
              </NavItem>
              <NavItem>
                <div style={{color:"#000000"}}><Link to="/AddRest" className="nav-link" >ADD RESTAURANT</Link></div>
              </NavItem>
              <NavItem>
                <div style={{color:"#000000"}}><Link to ="/home" className="nav-link">LOGOUT</Link></div>
               </NavItem>
            </Nav>
         </Collapse>
      </Navbar>
</div>
 );

   }
 }

export default AdminHeader;
