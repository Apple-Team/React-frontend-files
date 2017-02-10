import React, { Component } from 'react';
import { Link } from 'react-router';
import './Signup.css';

class Signup extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another className
    super();
    this.modalOpen=this.modalOpen.bind(this);
    this.modalClose=this.modalClose.bind(this);
    this.state = { data: [] };
    this.handleClick=this.handleClick.bind(this);
    console.log('test');
  }
 
  
   handleClick(ev){
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

  modalOpen(event){
    document.getElementById('Modal').style.display = "inline-block";
  }

  modalClose(event){
    document.getElementById('Modal').style.display ="none";
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

getInitialState() {
    return {
      email: null,
      username: null,
      password: null,
      confirmPassword: null,
      statesValue: null,
      forbiddenWords: ["password", "user", "username"]
    }
  }

  handlePasswordInput(event) {
    if(!this.isEmpty(this.state.confirmPassword)){
      this.refs.passwordConfirm.isValid();
    }
    this.refs.passwordConfirm.hideError();
    this.setState({
      password: event.target.value
    });
  }

  handleConfirmPasswordInput(event) {
    this.setState({
      confirmPassword: event.target.value
    });
  }

  saveAndContinue(e) {
    e.preventDefault();

    var canProceed = this.validateEmail(this.state.email) 
        && !this.isEmpty(this.state.statesValue)
        && this.refs.password.isValid()
        && this.refs.passwordConfirm.isValid();

    if(canProceed) {
      var data = {
        email: this.state.email,
        state: this.state.statesValue
      }
      alert('Thanks.');
    } else {
      this.refs.email.isValid();
      this.refs.state.isValid();
      this.refs.username.isValid();
      this.refs.password.isValid();
      this.refs.passwordConfirm.isValid();
    }
  }

  isConfirmedPassword(event) {
    return (event === this.state.password)
  }

  handleCompanyInput(event) {
    this.setState({
      username: event.target.value
    })
  }

  handleEmailInput(event){
    this.setState({
      email: event.target.value
    });
  }

  validateEmail(event) {
    
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(event);
  }

   isEmpty(value) {
    return !this.isEmpty(value);
  }

  updateStatesValue(value) {
    this.setState({
      statesValue: value
    })
  }



  render() {
    return (
      <div id="signup">
      <span><button className="btn1" onClick={this.modalOpen}>SIGN UP</button></span>
      <div id="Modal" className="modal">
      <form className="modal-content animate">
        <div className="imgcontainer">
          <button className="cancel" onClick={this.modalClose}>&times;</button>
          <img src={require('./images/user.png')} alt="Avatar" className="avatar" />
        </div>
        <div className="container" align="center">
          <label><b><center>Username</center></b></label> <br />
          <input type="text" placeholder="Enter Username" id="name" name="uname" validate={this.isEmpty}
              value={this.state.username}
              onChange={this.handleCompanyInput} 
              emptyMessage="Company name can't be empty"
              required/><br />
          <label><b><center>Email</center></b></label> <br />
          <input type="text" placeholder="Enter your Email" id="email" name="email" defaultValue={this.state.email} 
              validate={this.validateEmail}
              value={this.state.email}
              onChange={this.handleEmailInput} 
              errorMessage="Email is invalid"
              emptyMessage="Email can't be empty"
              errorVisible={this.state.showEmailError} required/><br />
          <label><b>Password</b></label><br />
          <input type="password" placeholder="Enter Password" id="pwd" name="psw"  validator="true"
              minCharacters="8"
              requireCapitals="1"
              requireNumbers="1"
              forbiddenWords={this.state.forbiddenWords}
              value={this.state.passsword}
              emptyMessage="Password is invalid"
              onChange={this.handlePasswordInput}  required/><br /><br />
          <label><b>Confirm Password</b></label><br />
          <input type="password" placeholder="Enter Password" id="confirm_pwd" name="pwd"  type="password"
              validate={this.isConfirmedPassword}
              value={this.state.confirmPassword}
              onChange={this.handleConfirmPasswordInput} 
              emptyMessage="Please confirm your password"
              errorMessage="Passwords don't match"required/><br /><br />
           
           <div className="form-check form-check-inline">
                <label className="form-check-label">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="role" value="1"/> Sign up as Administrator
                </label>
           </div>
          <div className="form-check form-check-inline">
                 <label className="form-check-label">
                     <input className="form-check-input" type="radio" name="inlineRadioOptions" id="role" value="0"/>Sign up as User
                 </label>
          </div>       
        <div className="container">
          <span id="btn1"><button className="btn" onClick={this.handleClick.bind(this)} type="submit">Signup</button></span><br /><br />
        </div>
        </div>
      </form>

      </div>
      </div>
      );

  }
}

export default Signup;