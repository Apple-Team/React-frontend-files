import React, { Component } from 'react';
import './form.css';

class form extends Component {
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
          &nbsp; &nbsp; &nbsp;<input type="checkbox" /> Remember me    <br /><br />
          <span className="psw"><a href="#">Forgot password?</a></span>
        </div>
      </form>
      </div>
      );
  }
}

export default form;