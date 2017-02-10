import React, { Component } from 'react';
import { Link } from 'react-router';
import './Login.css';

class Login extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another className
    super();
    this.modalOpen=this.modalOpen.bind(this);
    this.modalClose=this.modalClose.bind(this);
  }

  modalOpen(event){
    document.getElementById('Modal').style.display = "inline-block";
  }

  modalClose(event){
    document.getElementById('Modal').style.display ="none";
  }

  render() {
    return (
      <div id="fff">
      <button className="btn1" onClick={this.modalOpen}>LOGIN</button>
      <div id="Modal" className="modal">
      <form className="modal-content animate">
        <div className="imgcontainer">
          <button className="cancel" onClick={this.modalClose}>&times;</button>
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
      );
  }
}

export default Login;