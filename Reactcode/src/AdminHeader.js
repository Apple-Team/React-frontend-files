import React, { Component } from 'react';
import {Link} from 'react-router';
class AdminHeader extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another className

    super();
}
render() {

return(
<div>
<nav className="navbar  sticky-top navbar-toggleable-md navbar-light bg-faded">
  <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
  <span className="navbar-toggler-icon"></span>
  </button>
  <a className="navbar-brand" href="#"><img src={require('./images/logo.png')} width="60" height="60" className="d-inline-block" />Find'O Bistro</a>

  <div className="nav-dropdown collapse pull-xs-right nav navbar-nav navbar-toggleable-sm" id="navbarTogglerDemo02">

  <ul className="navbar-nav">
  <li className="nav-item active">
  <Link to="/ViewRest" className="nav-link" >View All Restaurants</Link>
  </li>
  <li className="nav-item">
  <Link to="/AddRest" className="nav-link">Add Restaurant</Link>
  </li>                                 

  <li className="nav-item " id="admin">
  <Link to ="/AdminHeader" className="nav-link">Logout</Link>
  </li>

  </ul>                       
  </div>

  </nav>
</div>
 );

   }
 }

export default AdminHeader;
