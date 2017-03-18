import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Link,hashHistory} from 'react-router';
import Header from './Header';
class UnAuth extends Component {
   render() {
      return (
         <div id="tf-home">
            <Header/>
            <p><h2 style={{paddingTop:"4%"}}>Join us to view this page!!<br/>
                                         <Link to="/Signup"><i style={{color:"#fcac46"}}>Sign Up Here</i></Link>...</h2></p>
         </div>
      )
   }
}

export default UnAuth;
