import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Link,hashHistory} from 'react-router';
import Header from './Header';
class UnAuth extends Component {
   render() {
      return (
         <div id="tf-home">
            <Header/>
            <p><h2 style={{paddingTop:"20%"}}>You are not Authorized to view this page!!<br/>
                                        Please <Link to="/Signup">Register</Link>...</h2></p>
         </div>
      )
   }
}

export default UnAuth;
