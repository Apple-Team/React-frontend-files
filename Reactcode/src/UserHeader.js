import React, { Component } from 'react';
import {Link,hashHistory } from 'react-router';
import ReactDOM from 'react-dom';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import './Signup.css';
import Admin from './Admin';
import UserHome from './UserHome';

var adob;
// webpack.config.js specifies index.js as the entry point, and
// index.js imports and renders this `App` component.

class UserHeader extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another className

    super();
    this.state = { data: [],get_data:[],popoverOpen: false,isOpen: false};
    this.handleLogout = this.handleLogout.bind(this);
    this.handleHistory = this.handleHistory.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggle1 = this.toggle1.bind(this);

    console.log('test');

  }
  toggle() {
   this.setState({
     popoverOpen: !this.state.popoverOpen
   });
 }
componentWillMount(){
  var that=this;
  fetch("http://localhost:9000/images/5498f7c0-ca2f-44b4-826c-0deb07521b20")
	.then(function(response) {
	  return response.blob();
	})
	.then(function(imageBlob) {
	  document.getElementById('logo').src = URL.createObjectURL(imageBlob);
	});

  var tok=window.sessionStorage.getItem('token');
   var id=window.sessionStorage.getItem('uid');
  fetch("http://localhost:9000/members/"+id)
  .then((response) => response.json())
       .then((responseJson) => {
          that.setState({
           get_data: responseJson

          });
    }).then(function(e){
      var d = new Date(that.state.get_data.dob);
      adob=d.getFullYear() + '-' + ("0" + (d.getMonth() + 1)).slice(-2) + '-' + ("0" + d.getDate()).slice(-2);
       console.log(adob);
       if(adob=='1970-01-01')
        adob='';
       });
 }

  handleLogout(){
      console.log(window.sessionStorage.getItem('token'));
      window.sessionStorage.removeItem('token');
      window.sessionStorage.clear();
      hashHistory.push('/home');
    }
  handleHistory(){

        hashHistory.push('/srchHistory');
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

 //console.log(document.getElementById('bday').value);
   fetch('http://localhost:9000/update_members/'+ id,
     {
       headers :{
         "Content-Type" : "application/json",
         "Authorization": "Bearer "+tok
       },
     method: "PUT",
     body: JSON.stringify({
                            //"pwd":this.state.get_data.pwd,
                            "email": document.getElementById('email').value,
                            "dob": document.getElementById('bday').value,
                            "user_Address": document.getElementById('address').value,
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

      <Navbar toggleable id="Header">
          <NavbarToggler right onClick={this.toggle1}><i className="fa fa-bars fa-2x" style={{color:"#fcac46"}} aria-hidden="true"></i></NavbarToggler>
          <NavbarBrand >
            <Link to="/UserHome"><img id="logo" width="50" height="50" className="d-inline-block align-center" />FindO Bistro</Link></NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="#"><b>Home</b></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#tf-collection"><b>Collections</b></NavLink>
              </NavItem>
              <NavItem>
                <Button id="Popover1" style={{color:"#fcac46",backgroundColor:"transparent",borderColor:"transparent"}}  onClick={this.toggle} >
                  <i  className="fa fa-user-circle-o" id="user" aria-hidden="true"></i>
                </Button>
                <Popover placement="bottom right" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
                 <PopoverTitle className="w3-center">
                  <b>My Profile</b>
                </PopoverTitle>


                  <PopoverContent>
                    <div >

                      <p className="w3-center"><img src={require('./images/avatar3.png')} className="w3-circle" style={{height:"106px",width:"106px"}} alt="Avatar"/></p>

                      <p className="w3-center">{this.state.get_data.name}</p>
                      <hr/>

                      <div className="form-group row">
                        <label for="example-text-input" className="col-2 col-form-label"><i className="fa fa-envelope-o" aria-hidden="true"></i></label>
                        <div className="col-8">
                           <input type="text" className="form-control" value={this.state.get_data.email} onChange={this.handleChange} id="email"/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="example-text-input" className="col-2 col-form-label"><i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i></label>
                        <div className="col-8">
                          <input type="text"  className="form-control"  value={adob} onChange={this.handleChange} id="bday"/>
                        </div>
                      </div>
                      <div className="form-group row">
                       <label for="example-text-input" className="col-2 col-form-label"><i className="fa fa-home fa-fw w3-margin-right w3-text-theme"></i></label>
                       <div className="col-8">
                         <input type="text"  className="form-control" value={this.state.get_data.user_Address} onChange={this.handleChange} id="address"/>
                       </div>
                     </div>
                     <div className="form-group-row">
                         <div className="col-8">
                           <button type="button" className="btn btn-warning" onClick={() => this.handleUpdate(this.state.get_data.id)}>Submit</button>
                         </div>
                     </div>
                   </div>
                  <hr/>
                  <button type="button" id="logout1" style={{float:"left"}} className="btn btn-secondary" onClick={this.handleHistory}><i className="fa fa-search">Search History</i></button>
                  <button type="button" id="logout1" style={{float:"left"}} className="btn btn-secondary" onClick={this.handleLogout}><i className="fa fa-sign-out" aria-hidden="true">LOGOUT</i></button>
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
