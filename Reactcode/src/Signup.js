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
  handleSignup(ev){
    var uname=document.getElementById('usernamesignup').value;
    var email=document.getElementById('emailsignup').value;
    var pwd=document.getElementById('passwordsignup').value;
    var confirm_pwd=document.getElementById('passwordsignup_confirm').value;
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
                              "uname": uname,
                              "email": email,
                              "pwd": confirm_pwd,
                              "role": this.role

                            })
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
          <div className="container1">
           
            <header>
                <h1> Registration Form</h1>
                
            </header>
            <section>               
                <div id="container1_demo" >
            
                    <div id="wrapper1">

                        <div id="register" className="animate form">
                            <form autocomplete="on"> 
                                <h1> Sign up </h1> 
                                <p> 
                                    <label for="usernamesignup" className="uname" >Your username</label>
                                    <input id="usernamesignup" name="usernamesignup" required="required" type="text" placeholder="mysuperusername690" />
                                </p>
                                <p> 
                                    <label for="emailsignup" className="youmail"  > Your email</label>
                                    <input id="emailsignup" name="emailsignup" required="required" type="email" placeholder="mysupermail@mail.com"/> 
                                </p>
                                <p> 
                                    <label for="passwordsignup" className="youpasswd" >Your password </label>
                                    <input id="passwordsignup" name="passwordsignup" required="required" type="password" placeholder="eg. X8df!90EO"/>
                                </p>
                                <p> 
                                    <label for="passwordsignup_confirm" className="youpasswd" >Please confirm your password </label>
                                    <input id="passwordsignup_confirm" name="passwordsignup_confirm" required="required" type="password" placeholder="eg. X8df!90EO"/>
                                </p>
                                <p>
                                <div className="radio">
                                  <label><input type="radio" id="role"/>SignUp as Admin</label>
                                </div>
                                </p>
                                <p className="signin button"> 
                                    <button type="button" className="btn btn-warning" onClick={this.handleSignup}>Sign Up</button> 
                                </p>
                                <p>  
                                    Already a member ?
                                     <Link to="/Login" className="to_register"> Go and log in </Link>
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

export default Signup;