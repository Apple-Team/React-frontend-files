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
    this.modalOpen1=this.modalOpen1.bind(this);
    this.modalClose1=this.modalClose1.bind(this);
     this.modalOpen2=this.modalOpen2.bind(this);
    this.modalClose2=this.modalClose2.bind(this);
    this.state = { data: [] };
    this.handleSignup=this.handleSignup.bind(this);
    this.handleLogin=this.handleLogin.bind(this);

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
  fetch("http://localhost:9000/images/286b4b0f-c497-4d5e-81fe-906ef239b5d1")
	.then(function(response) {
	  return response.blob();
	})
	.then(function(imageBlob) {
	  document.getElementById('signUp').src = URL.createObjectURL(imageBlob);
	});
  fetch("http://localhost:9000/images/286b4b0f-c497-4d5e-81fe-906ef239b5d1")
	.then(function(response) {
	  return response.blob();
	})
	.then(function(imageBlob) {
	  document.getElementById('signIn').src = URL.createObjectURL(imageBlob);
	});


    }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleSignup(ev){
    var uname=document.getElementById('name').value;
    var email=document.getElementById('email').value;
    var pwd=document.getElementById('pwd').value;
    var confirm_pwd=document.getElementById('confirm_pwd').value;
    var role=document.getElementById('role').value;
    if (role==''){
      role='0';
    }
      else
        role='1';

    if(uname!=''&&email!=''&&pwd!=''&&confirm_pwd!=''){

    if(pwd.value !== confirm_pwd.value) {
    confirm_pwd.setCustomValidity("Passwords Don't Match");
  }
  else {
    fetch('http://localhost:9000/create_member',
      {
        headers :{
          "Content-Type" : "application/json"
        },
       method: "POST",
       body: JSON.stringify({
                              "uname": document.getElementById('name').value,
                              "email": document.getElementById('email').value,
                              "pwd": document.getElementById('confirm_pwd').value,
                              "role": this.role

                            })
     })
   }
}
else{
  alert('Enter all details');
}
 }

  modalOpen1(event){
    document.getElementById('Modal1').style.display = "inline-block";
  }

  modalClose1(event){
    document.getElementById('Modal1').style.display ="none";
  }

  modalOpen2(event){
    document.getElementById('Modal2').style.display = "inline-block";
  }

  modalClose2(event){
    document.getElementById('Modal2').style.display ="none";
  }

validatePassword(ev){
   var password = document.getElementById("pwd");
  var confirm_password = document.getElementById("confirm_pwd");

  if(password.value !== confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}

handleLogin(){
   var name=document.getElementById('username').value;
   var password=document.getElementById('password').value;
    var lgn=JSON.stringify({
      "name":name,
      "password":password
    })
    fetch("http://localhost:9000/authenticate_member_by_username_password/"+name+"?password="+password,
            {
        headers :{
          "Content-Type" : "application/json",
          "Accept" : "application/json"
        }
     })
     hashHistory.push('/Admin/'+name)
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
                <span><button className="btn1" type="button" className="btn btn-secondary btn-sm" onClick={this.modalOpen1}><i className="fa fa-sign-in" aria-hidden="true"></i><b> SIGN UP</b></button></span>
              </NavItem>
              <NavItem>
              <button className="btn1" type="button" className="btn btn-secondary btn-sm" onClick={this.modalOpen2}><i className="fa fa-user" aria-hidden="true"></i><b> SIGN IN</b></button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
  </div>

  <div id="signup">
      <div id="Modal1" className="modal">
      <form className="modal-content animate">
        <div className="imgcontainer">
          <button className="cancel" onClick={this.modalClose1}>&times;</button>
          <img id="signUp" alt="Sign Up" className="avatar" />
        </div>
        <div className="container" align="center">
          <label><b><center>Username</center></b></label> <br />
          <input type="text" placeholder="Enter Username" id="name" name="uname" required/><br />
          <label><b><center>Email</center></b></label> <br />
          <input type="text" placeholder="Enter your Email" id="email" name="email" required/><br />
          <label><b>Password</b></label><br />
          <input type="password" placeholder="Enter Password" id="pwd" name="psw"  validator="true" required/><br /><br />
          <label><b>Confirm Password</b></label><br />
          <input type="password" placeholder="Enter Password" id="confirm_pwd" name="pwd"  type="password" onChange ={this.validatePassword.bind(this)} onKeyUp ={this.validatePassword.bind(this)} required/><br /><br />

           <div className="form-check form-check-inline">
                <label className="form-check-label">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="role" value="1"/> Sign up as Administrator
                </label>
           </div>

        <div className="container">
          <span id="btn1"><button className="btn" onClick={this.handleSignup.bind(this)} type="submit">Signup</button></span><br /><br />
        </div>
        </div>
      </form>

      </div>
   </div>

   <div id="fff">
      <div id="Modal2" className="modal">
      <form className="modal-content animate">
        <div className="imgcontainer">
          <button className="cancel" onClick={this.modalClose2}>&times;</button>
          <img id="signIn" alt="Sign In" className="avatar" />
        </div>
        <div className="container" align="center">
          <label><b><center>USERNAME</center></b></label> <br />
          <input type="text" placeholder="Enter Username" id="username" name="uname" required/><br />
          <label><b>PASSWORD</b></label><br />
          <input type="password" placeholder="Enter Password" name="psw" id="password" required/><br /><br />
        </div>
        <div className="container" id="btn1">
          <button className="btn" type="submit" onClick={this.handleLogin.bind(this)}>Login</button>
          &nbsp; &nbsp; &nbsp;&nbsp;
          <span className="psw"><a href="#">Forgot password?</a></span> <br /><br />
          <p> New Member?  <Link to ="/Signup" className="btn btn-primary">Signup</Link></p>
        </div>
      </form>
      </div>
      </div>




  </div>

    );

   }
 }

export default Header;
