import React, { Component } from 'react';
import {Link} from 'react-router';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './Signup.css';

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
    this.handleClick=this.handleClick.bind(this);
    console.log('test');

  }

  handleClick(ev){
    var uname=document.getElementById('name').value;
    var email=document.getElementById('email').value;
    var pwd=document.getElementById('pwd').value;
    var confirm_pwd=document.getElementById('confirm_pwd').value;
    var role=document.getElementById('role').value;
    if(uname!=''&&email!=''&&pwd!=''&&confirm_pwd!=''){
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
                              "role": document.getElementById('role').value

                            })
     })
     .then(function (data) {
  alert('Added into the database',data);
  window.location.reload()
  })
  .catch(function (error) {
  alert('Not added into the database',error);
  });
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



  // `render` is called whenever the component's props OR state are updated.
render() {

return(
  <div>
  <div className="tf-nav">
 	 	<nav className="navbar navbar-toggleable-md fixed-top navbar-light bg-faded">

      <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

        <a className="navbar-brand" href="#"><img src={require('./images/logo.png')} width="60" height="60" className="d-inline-block align-center" />FindO Bistro</a>

        <div className="nav-dropdown collapse nav navbar-nav navbar-toggleable-sm" id="navbarTogglerDemo02">
             <ul className="nav navbar-nav pull-lg-right">
                <li className="nav-item active" id="nav">
                   <a className="nav-link" href="#">Home</a>
                </li>
                <li className="nav-item">
                   <a className="nav-link" href="#tf-collection">Collections</a>
                </li>
               <li className="nav-item">
                <span><button className="btn1" type="button" className="btn btn-secondary btn-sm" onClick={this.modalOpen1}><i className="fa fa-sign-in" aria-hidden="true"></i>SIGN UP</button></span>
             </li>
                <li className="nav-item">
                  <button className="btn1" type="button" className="btn btn-secondary btn-sm" onClick={this.modalOpen2}><i className="fa fa-user" aria-hidden="true"></i>LOGIN</button>
                </li>
                <li className="nav-item">
                  <Link to ="/Admin" className="nav-link" ><i className="fa fa-sign-in" aria-hidden="true"></i>Admin</Link>
               </li>
               <li className="nav-item">
                  <Link to ="/map" className="nav-link" ><i className="fa fa-sign-in" aria-hidden="true"></i>maps</Link>
               </li>
            </ul>
          </div>
      </nav>
  </div>



  <div id="signup">
      <div id="Modal1" className="modal">
      <form className="modal-content animate">
        <div className="imgcontainer">
          <button className="cancel" onClick={this.modalClose1}>&times;</button>
          <img src={require('./images/user.png')} alt="Avatar" className="avatar" />
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
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="role" value={1}/> Sign up as Administrator
                </label>
           </div>

        <div className="container">
          <span id="btn1"><button className="btn" onClick={this.handleClick.bind(this)} type="submit">Signup</button></span><br /><br />
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
          <img src={require('./images/login.png')} alt="Avatar" className="avatar" />
        </div>
        <div className="container" align="center">
          <label><b><center>USERNAME</center></b></label> <br />
          <input type="text" placeholder="Enter Username" name="uname" required/><br />
          <label><b>PASSWORD</b></label><br />
          <input type="password" placeholder="Enter Password" name="psw" required/><br /><br />
        </div>
        <div className="container" id="btn1">
          <button className="btn" type="submit">Login</button>
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
