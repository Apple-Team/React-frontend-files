import React, { Component } from 'react';
import {Link,hashHistory } from 'react-router';
import ReactDOM from 'react-dom';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';
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
    this.toggle1 = this.toggle1.bind(this);

    this.state = {
      isOpen: false,data:[],  popoverOpen: false
    };

    console.log('test');

  }
  toggle() {
   this.setState({
     popoverOpen: !this.state.popoverOpen
   });
 }
componentWillMount(){

  fetch("http://localhost:9000/images/5498f7c0-ca2f-44b4-826c-0deb07521b20")
	.then(function(response) {
	  return response.blob();
	})
	.then(function(imageBlob) {
	  document.getElementById('logo').src = URL.createObjectURL(imageBlob);
	});

  var tok=window.sessionStorage.getItem('token');
   var id=window.sessionStorage.getItem('uid');
  fetch("http://localhost:9000/members/"+id,
  {
    headers :{
    "Content-Type" : "application/json",
    "Authorization": "Bearer "+tok
  }
}
 ).then((response) => response.json())
       .then((responseJson) => {
          this.setState({
           get_data: responseJson

          });
    });
       console.log(this.state.get_data);
 }
  handleLogout(){
      console.log(window.sessionStorage.getItem('token'));
      window.sessionStorage.removeItem('token');
      window.sessionStorage.clear();
      hashHistory.push('/home');
    }


  toggle1() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  handleChange(event){
   this.setState({
     get_data: event.target.value});
  }


  handleUpdate(){
    var tok=window.sessionStorage.getItem('token');
    var id=window.sessionStorage.getItem('uid');


   fetch('http://localhost:9000/update_members/'+ id,
     {
       headers :{
         "Content-Type" : "application/json",
         "Authorization": "Bearer "+tok
       },
     method: "PUT",
     body: JSON.stringify({
                            "email": document.getElementById('email').value,
                            "pwd": document.getElementById('pwd').value,
                            "bday": document.getElementById('bday').value,
                            "address": document.getElementById('address').value,
                          })
    }).then(response=>{
      if(200==response.status){
        console.log(this.state.data1);
        window.location.reload();

       }
       else if (403==response.status) {
       window.alert("Forbidden!!");
       }
       else{
          hashHistory.push('/UnAuth');
       }
     });
    }

  // `render` is called whenever the component's props OR state are updated.
render() {

return(
  <div>
  <div className="tf-nav">

      <Navbar fixed="top" toggleable>
          <NavbarToggler right onClick={this.toggle1}><i className="fa fa-bars fa-2x" aria-hidden="true"></i></NavbarToggler>
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
                <Button id="Popover1" onClick={this.toggle} >
                  <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                </Button>
                <Popover placement="bottom right" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
                  <PopoverTitle>My Profile
                    <div style={{color:"#000000",float:"right"}}><button type="button" id="logout1" className="btn btn-secondary" onClick={this.handleLogout}><i className="fa fa-sign-out" aria-hidden="true"></i></button></div>
                  </PopoverTitle>
                  <PopoverContent>
                    <div className="w3-container">

                      <p className="w3-center"><img src={require('./images/avatar3.png')} className="w3-circle" style={{height:"106px",width:"106px"}} alt="Avatar"/></p>

                      <p style={{position:"align-center"}}>{window.sessionStorage.getItem('name')}</p>
                      <hr/>
                      <div className="form-group row">
                        <label for="example-text-input" className="col-2 col-form-label"><i className="fa fa-key" aria-hidden="true"></i></label>
                        <div className="col-8">
                           <input type="text" className="form-control" /*value={this.state.get_data.pwd}*/ onChange={this.handleChange} id="pwd"/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="example-text-input" className="col-2 col-form-label"><i className="fa fa-envelope-o" aria-hidden="true"></i></label>
                        <div className="col-8">
                           <input type="text" className="form-control" /*value={this.state.get_data.email}*/ onChange={this.handleChange} id="email"/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="example-text-input" className="col-2 col-form-label"><i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i></label>
                        <div className="col-8">
                          <input type="text"  className="form-control"  onChange={this.handleChange} id="bday"/>
                        </div>
                      </div>
                      <div className="form-group row">
                       <label for="example-text-input" className="col-2 col-form-label"><i className="fa fa-home fa-fw w3-margin-right w3-text-theme"></i></label>
                       <div className="col-8">
                         <input type="text"  className="form-control"  onChange={this.handleChange} id="address"/>
                       </div>
                     </div>
                     <div className="form-group-row">
                         <div className="col-8">
                           <button type="button" className="btn btn-warning" onClick={() => this.handleUpdate(this.state.get_data.id)}>Submit</button>
                         </div>
                     </div>

                    </div>

                  <br/>
                  </PopoverContent>
                </Popover>
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
