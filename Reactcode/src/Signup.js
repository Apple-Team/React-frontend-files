import React, { Component } from 'react';
import { Link,hashHistory } from 'react-router';
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';
import './Signup.css';
import Admin from './Admin';
import Header from './Header';

class Signup extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another className
    super();
    this.handleSignup=this.handleSignup.bind(this);
    this.toggle1 = this.toggle1.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.toggle3 = this.toggle3.bind(this);
    this.toggle4 = this.toggle4.bind(this);
    this.toggle5 = this.toggle5.bind(this);
    this.state = {
      popoverOpen1: false,
      popoverOpen2: false,
      popoverOpen3: false,
      popoverOpen4: false,
      popoverOpen5: false
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
   toggle3() {
    this.setState({
      popoverOpen3: !this.state.popoverOpen3
    });
  }
   toggle4() {
    this.setState({
      popoverOpen4: !this.state.popoverOpen4
    });
  }

  toggle5() {
    this.setState({
      popoverOpen5: !this.state.popoverOpen5
    });
  }

  validateUsername(ev){
   var username = document.getElementById("usernamesignup");
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

  validateEmail(ev){
   var email = document.getElementById("emailsignup");
   var mailformat =/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  if(!email.value.match(mailformat)) {
    this.setState({
      popoverOpen2:true
    });
  } 
  else {
    this.setState({
      popoverOpen2:false
    });
  }
  console.log(this.state.popoverOpen2);
}

  validatePassword(ev){
   var password = document.getElementById("passwordsignup");
   var format=/^[A-Za-z0-9_]+$/;
  if((password.value.length<6)&&(!password.value.match(format))) {
    this.setState({
      popoverOpen3:true
    });
  } 
  else {
    this.setState({
      popoverOpen3:false
    });
  }
}

 validatePasswords(ev){
   var password = document.getElementById("passwordsignup");
  var confirm_password = document.getElementById("passwordsignup_confirm");
  if(password.value !=confirm_password.value) {
    this.setState({
      popoverOpen4:true
    });
  } 
  else {
    this.setState({
      popoverOpen4:false
    });
  }
}

 validateRole(ev){
   var role = document.getElementById("role").value;
   console.log(role);
  if(role=='Select Role') {
    this.setState({
      popoverOpen5:true
    });
  } 
  else {
    this.setState({
      popoverOpen5:false
    });
  }
}

  handleSignup(ev){
    var uname=document.getElementById('usernamesignup').value;
    var email=document.getElementById('emailsignup').value;
    var pwd=document.getElementById('passwordsignup').value;
    var confirm_pwd=document.getElementById('passwordsignup_confirm').value;
    var role=document.getElementById('role').value;

    if(uname!=''&&email!=''&&pwd!=''&&confirm_pwd!=''&&role!=''){

    if((this.state.popoverOpen1)||(this.state.popoverOpen2)||(this.state.popoverOpen3)||(this.state.popoverOpen4)||(this.state.popoverOpen5)) {
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
    else if(this.state.popoverOpen3){
    this.setState({
      popoverOpen3:true
    });
    }
    else if(this.state.popoverOpen4){
    this.setState({
      popoverOpen4:true
    });
    }
     else if(this.state.popoverOpen5){
    this.setState({
      popoverOpen5:true
    });
    }
  }
   else {
    console.log("hh");
    fetch('http://localhost:9000/create_member',
      {
        headers :{
          "Content-Type" : "application/json"

        },
       method: "POST",
       body: JSON.stringify({
                              "uname": uname,
                              "email": email,
                              "pwd": confirm_pwd,
                              "role": role

                            })
     }).then(response=>{
       if(200==response.status){
          document.getElementById('Ack').style.display="block";
          document.getElementById('Ack2').style.display="none";
            }
            else if(400==response.status){
              document.getElementById('Ack').style.display="none";
              document.getElementById('Ack2').style.display="block";
            }
      }).catch(function (error) {
            document.getElementById('Ack1').style.display="block";
        });
   }
}
else{
  alert('Enter all details');
 }
}

  render() {
    return (
      <div id="tf-home">
       <Header/>
          <div className="container1">
          <br />

          <div id="Ack" style={{display: 'none'}}>
              <h3> Thank you for Signing up! <i className="fa fa-smile-o" aria-hidden="true"></i> Please Sign in..</h3>
          </div>
          <div id="Ack1" style={{display: 'none'}}>
              <h3> Sorry.. <i className="fa fa-frown-o" aria-hidden="true"></i> Something went wrong! Try Signing up again</h3>
          </div>
          <div id="Ack2" style={{display: 'none'}}>
              <h3> Sorry.. <i className="fa fa-frown-o" aria-hidden="true"></i> Username already exists!</h3>
          </div>
          <br />
            <section>
                <div id="container1_demo" >

                    <div id="wrapper1">

                        <div id="register" className="animate form">
                            <form autocomplete="on">
                                <h1> Sign up </h1>
                                <p>
                                    <label for="usernamesignup" className="uname" >Your username</label>
                                    <input id="usernamesignup" name="usernamesignup" required="required" type="text" placeholder="mysuperusername690" onChange ={this.validateUsername.bind(this)} onKeyUp ={this.validateUsername.bind(this)} onClick={this.validateUsername.bind(this)}/>
                                </p>
                                <p>
                                    <label for="emailsignup" className="youmail"  > Your email</label>
                                    <input id="emailsignup" name="emailsignup" required="required" type="email" placeholder="mysupermail@mail.com" onChange ={this.validateEmail.bind(this)} onKeyUp ={this.validateEmail.bind(this)} onClick={this.validateEmail.bind(this)}/>
                                </p>
                                <p>
                                    <label for="passwordsignup" className="youpasswd" >Your password </label>
                                    <input id="passwordsignup" name="passwordsignup" required="required" type="password" placeholder="eg. X8df!90EO" onChange ={this.validatePassword.bind(this)} onKeyUp ={this.validatePassword.bind(this)} onClick={this.validatePassword.bind(this)}/>
                                </p>
                                <p>
                                    <label for="passwordsignup_confirm" className="youpasswd" >Please confirm your password </label>
                                    <input id="passwordsignup_confirm" name="passwordsignup_confirm" required="required" type="password" onChange ={this.validatePasswords.bind(this)} onKeyUp ={this.validatePasswords.bind(this)} onClick={this.validatePasswords.bind(this)} placeholder="eg. X8df!90EO"/>
                                </p>
                                <p>
                                <label >Select Your Role </label>
                                <label className="form-check-label">
                                <select className="custom-select" id="role" onClick ={this.validateRole.bind(this)}>
                                  <option selected>Select Role</option>
                                  <option value="ADMIN">ADMIN</option>
                                  <option value="USER">USER</option>
                                </select>
                                </label>
                                </p>
                                <p className="signin button">

                                    <button type="button" className="btn btn-warning" onClick={this.handleSignup}>Sign Up</button>
                                </p>
                                <p>
                                     Already a member ?
                                     <Link to="/Login" className="to_register">Please SignIn </Link>
                                </p>
                            </form>
                        </div>

                    </div>
                </div>
            </section>


            <div id="pop_username">
        <Popover placement="right" isOpen={this.state.popoverOpen1} target="usernamesignup" toggle={this.toggle1}>
          <PopoverContent>Username must be at least 6 characters long</PopoverContent>
        </Popover>
      </div>

      <div id="pop_email">
        <Popover placement="right" isOpen={this.state.popoverOpen2} target="emailsignup" toggle={this.toggle2}>
          <PopoverContent>Email should of "mysupermail@mail.com" format</PopoverContent>
        </Popover>
      </div>

      <div id="pop_password">
        <Popover placement="right" isOpen={this.state.popoverOpen3} target="passwordsignup" toggle={this.toggle3}>
          <PopoverContent>Password must be at least 6 characters long and must be alphanumeric</PopoverContent>
        </Popover>
      </div>

             <div id="pop_confirmpass">
        <Popover placement="right" isOpen={this.state.popoverOpen4} target="passwordsignup_confirm" toggle={this.toggle4}>
          <PopoverContent>Passwords don't Match</PopoverContent>
        </Popover>
      </div>

      <div id="pop_role">
        <Popover placement="right" isOpen={this.state.popoverOpen5} target="role" toggle={this.toggle5}>
          <PopoverContent>Select Role</PopoverContent>
        </Popover>
        </div>

        </div>


      </div>
      );

  }
}

export default Signup;
