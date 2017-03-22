import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Link,hashHistory} from 'react-router';
import Header from './Header';
class UnAuth extends Component {
   render() {
      return (
         <div>
            
           <div id="tf-home">
           <Header/>
            <p><h2 style={{paddingTop:"4%"}}>Join us to view this page!!<br/>
                                         <Link to="/Signup"><i>Please</i> <i style={{color:"#fcac46",textDecoration:"underline"}}>Sign Up</i></Link>...</h2></p>
         </div>
         </div>
      )
   }
}

export default UnAuth;
