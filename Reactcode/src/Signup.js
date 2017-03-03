import React, { Component } from 'react';
import { Link } from 'react-router';
import './Signup.css';
import Admin from './Admin';

class Signup extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another className
    super();
    this.handleSignup=this.handleSignup.bind(this);

  }
  componentWillMount(){
    fetch("http://localhost:9000/images/286b4b0f-c497-4d5e-81fe-906ef239b5d1")
  	.then(function(response) {
  	  return response.blob();
  	})
  	.then(function(imageBlob) {
  	  document.getElementById('signUp').src = URL.createObjectURL(imageBlob);
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
 validatePassword(ev){
    var password = document.getElementById("pwd");
   var confirm_password = document.getElementById("confirm_pwd");

   if(password.value !== confirm_password.value) {
     confirm_password.setCustomValidity("Passwords Don't Match");
   } else {
     confirm_password.setCustomValidity('');
   }
 }

  render() {
    return (
      <div id="tf-home">
          <div className="container">
          <form className="w3-center w3-animate-top">

            <div className="imgcontainer">

              <img id="signUp" alt="Sign Up" className="avatar" width="160" height="260"/>
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
      );

  }
}

export default Signup;
