import React, { Component } from 'react';
import { Link,hashHistory} from 'react-router';
import './Login.css';
import './Signup.css';
import Signup from './Signup';

class Login extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another className
    super();
    this.handleLogin=this.handleLogin.bind(this);

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
      <div id="tf-home">
        <div className="container1">
           
            <header>
                <h1>Login Form</h1>
                
            </header>
            <section>               
                <div id="container1_demo" >            
                    <div id="wrapper1">              
                                               
                        <div id="login" className="animate form">
                            <form autocomplete="on"> 
                                <h1>Sign In</h1> 
                                <p> 
                                    <label for="username" className="uname" > Your email or username </label>
                                    <input id="username" name="username" required="required" type="text" placeholder="myusername or mymail@mail.com"/>
                                </p>
                                <p> 
                                    <label for="password" className="youpasswd"> Your password </label>
                                    <input id="password" name="password" required="required" type="password" placeholder="eg. X8df!90EO" /> 
                                </p>

                                <p className="login button">                               
                                    <button type="button" className="btn btn-warning" onClick={this.handleLogin}>SIGN IN</button>                       
                                </p>
                                <p >
                                    Not a member yet ?
                                     <Link to="/Signup" className="to_register">Join us</Link>
                                </p>
                            </form>
                        </div>

                    </div>
                </div>  
            </section>
        </div>                       
         

      </div>
     );
  }
}

export default Login;