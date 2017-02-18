import React, { Component } from 'react';
import {Router, Route, hashHistory,Link} from 'react-router';
import './Admin.css';
// webpack.config.js specifies index.js as the entry point, and
// index.js imports and renders this `App` component.


class Admin extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another className
    super();
  }

  // `render` is called whenever the component's props OR state are updated.
  render() {
    // console.log('The App component was rendered')
 	 	return(
 	 	<div className="wrapper" >
          <div className="overlay">
             <div className="row">       
               <div className="col" id="col1">
                    <nav className="navbar  sticky-top navbar-toggleable-md navbar-light bg-faded">
                        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                          <span className="navbar-toggler-icon"></span>
                         </button>
                         <a className="navbar-brand" href="#"><img src={require('./images/logo.png')} width="40" height="40" className="d-inline-block" />Find'O Bistro</a>

                         <div className="nav-dropdown collapse pull-xs-right nav navbar-nav navbar-toggleable-sm" id="navbarTogglerDemo02">

                             <ul className="navbar-nav">
                                 <li className="nav-item active">
                                      <Link to="/ViewRest" className="nav-link" >View All Restaurants</Link>
                                 </li>
                                 <li className="nav-item">
                                      <Link to="/AddRest" className="nav-link" >Add Restaurant</Link>
                                 </li>
                               
                                 <li className="nav-item " id="admin">
                                     <Link to ="/Admin" className="nav-link">Logout</Link>
                                 </li>

                            </ul>                       
                        </div>
                       
                    </nav>
                 </div>
             </div>
            <div className="row">
                <div className="col" id="col2">
                    	<div className="content">
                			<div className="txt1">
                				Welcome to Find'o Bistro,
                				     <br/>{this.props.name}!!
                				</div>
                				</div>
                			
                </div>
            </div>
        </div>
     </div>




 	 );
 	}
   }
   export default Admin;