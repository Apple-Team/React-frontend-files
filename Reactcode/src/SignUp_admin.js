import React, { Component } from 'react';
import { Link } from 'react-router';
import './SignUp_admin.css';

class SignUp_admin extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another className
    super();
    this.state = {
      formVisible: true,
    };
  }


  handleVisible(){
      const close=!this.state.formVisible
      this.setState({formVisible:close});
    }

  render() {
      const formVisible = this.state.formVisible;
    return (
      <div id="fff">
      <form className="modal-content animate">
        <div className="imgcontainer">
          <a href="#" className="cancel">&times;</a>
          <img src={require('./images/signup.jpg')} alt="Avatar" className="avatar" />
        </div>
        <div className="container" align="center">
          <label><b><center>Username</center></b></label> <br />
          <input type="text" placeholder="Enter Username" name="uname" required/><br />
          <label><b><center>Email</center></b></label> <br />
          <input type="text" placeholder="Enter your Email" name="email" required/><br />
          <label><b>Password</b></label><br />
          <input type="password" placeholder="Enter Password" name="psw" required/><br /><br />
          <label><b>Confirm Password</b></label><br />
          <input type="password" placeholder="Enter Password" name="psw" required/><br /><br />
        </div>
        <div className="container">
          <span id="btn1"><button className="btn" type="submit">Signup</button></span><br /><br />
          <span id="wrapper">Not a new user? </span>&nbsp;
          <Link to ="/login" className="btn btn-primary">Login</Link>
        </div>
      </form>
      </div>
      );
  }
}

export default SignUp_admin;