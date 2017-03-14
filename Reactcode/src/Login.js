import React, { Component } from 'react';
import { Link,hashHistory} from 'react-router';
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';
import './Signup.css';
import Signup from './Signup';
import Header from './Header';


class Login extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another className
    console.log('test');
    super();
    this.toggle1 = this.toggle1.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.handleLogin=this.handleLogin.bind(this);
    this.state={
        clientData:[],
        popoverOpen1: false,
      popoverOpen2: false
    };

  }

toggle1() {
    this.setState({
      popoverOpen1: !this.state.popoverOpen1
    });
  }
   toggle2() {
    this.setState({
      popoverOpen2: !this.state.popoverOpen2
    });
  }

  validateUsername(ev){
   var username = document.getElementById("username");
   var len=username.value.length;
  if(len<6) {
    this.setState({
      popoverOpen1:true
    });
  } 
  else {
    this.setState({
      popoverOpen1:false
    });
  }
}

validatePassword(ev){
   var password = document.getElementById("password");
  if(password.value.length<6) {
    this.setState({
      popoverOpen2:true
    });
  } 
  else {
    this.setState({
      popoverOpen2:false
    });
  }
}

  handleLogin(){
    var that=this;
     var name=document.getElementById('username').value;
     var password=document.getElementById('password').value;
     if(name!=''&&password!=''){

    if((this.state.popoverOpen1)||(this.state.popoverOpen2)) {
    if(this.state.popoverOpen1){
    this.setState({
      popoverOpen1:true
    });
    }
    else if(this.state.popoverOpen2){
    this.setState({
      popoverOpen2:true
    });
    }
  }
  else{
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
}
else{
    alert('Fill all the fields');
  }
  }


  render() {
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
                                    <input id="username" name="username" required="required" type="text" placeholder="myusername" onChange ={this.validateUsername.bind(this)} onKeyUp ={this.validateUsername.bind(this)} onClick={this.validateUsername.bind(this)}/>
                                </p>
                                <p>
                                    <label for="password" className="youpasswd"> Your password </label>
                                    <input id="password" name="password" required="required" type="password" placeholder="eg. X8df!90EO" onChange ={this.validatePassword.bind(this)} onKeyUp ={this.validatePassword.bind(this)} onClick={this.validatePassword.bind(this)}/>
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

        <div id="pop_username">
        <Popover placement="right" isOpen={this.state.popoverOpen1} target="username" toggle={this.toggle1}>
          <PopoverContent>Enter a valid username of atleast 6 characters</PopoverContent>
        </Popover>
      </div>

      <div id="pop_password">
        <Popover placement="right" isOpen={this.state.popoverOpen2} target="password" toggle={this.toggle2}>
          <PopoverContent>Enter valid Password of atleast 6 characters</PopoverContent>
        </Popover>
      </div>

      </div>
     );
  }
}

export default Login;
