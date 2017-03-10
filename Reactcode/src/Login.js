import React, { Component } from 'react';
import { Link,hashHistory} from 'react-router';
import './Login.css';
import './Signup.css';
import Signup from './Signup';
import Header from './Header';


class Login extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another className
    console.log('test');
    super();
    this.handleLogin=this.handleLogin.bind(this);
    this.state={
        clientData:[]
    };

  }

  handleLogin(){
    var that=this;
     var name=document.getElementById('username').value;
     var password=document.getElementById('password').value;
      var lgn=JSON.stringify({
        "name":name,
        "password":password
      })
      fetch("http://localhost:9000/users/signin?username="+name+"&password="+password)
      .then(response=>{
        if(200==response.status){
          response.json().then((data)=>{
            that.setState({clientData:data});
          }).then(function(e){
                console.log(that.state.clientData.role);
                if(that.state.clientData.role=='ADMIN'){
                  hashHistory.push('/Admin/'+name);
                  window.sessionStorage.setItem('token',that.state.clientData.authToken);
                }
                else{
                  window.sessionStorage.setItem('token',that.state.clientData.authToken);
                  hashHistory.push('/UserHome');
                }
              });
        }
        else{
          window.alert("Invalid details");
          }
        });
  }


  render() {
  console.log(window.sessionStorage.getItem('token'));
    return (
      <div id="tf-home">
      <Header />
        <div className="container1">

            <section>
                <div id="container1_demo" >
                    <div id="wrapper1">

                        <div id="login" className="animate form">
                            <form autocomplete="on">
                                <h1>Sign In</h1>
                                <p>
                                    <label for="username" className="uname" > Your Username </label>
                                    <input id="username" name="username" required="required" type="text" placeholder="myusername"/>
                                </p>
                                <p>
                                    <label for="password" className="youpasswd"> Your password </label>
                                    <input id="password" name="password" required="required" type="password" placeholder="eg. X8df!90EO" />
                                </p>

                                <p className="login button">
                                    <button type="button" className="btn btn-warning" onClick={this.handleLogin.bind(this)}>SIGN IN</button>
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
