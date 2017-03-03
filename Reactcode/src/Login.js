import React, { Component } from 'react';
import { Link,hashHistory} from 'react-router';
import './Login.css';
import './Signup.css';
import Admin from './Admin';

class Login extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another className
    super();
    this.handleLogin=this.handleLogin.bind(this);

  }
componentWillMount(){
  fetch("http://localhost:9000/images/286b4b0f-c497-4d5e-81fe-906ef239b5d1")
	.then(function(response) {
	  return response.blob();
	})
	.then(function(imageBlob) {
	  document.getElementById('signIn').src = URL.createObjectURL(imageBlob);
	});

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

  render() {
    return (
      <div id="fff">
         <form >
           <div className="imgcontainer">
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

      );
  }
}

export default Login;
