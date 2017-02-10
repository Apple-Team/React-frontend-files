import React, { Component } from 'react';
class Footer extends Component {
  constructor() {
    // In a constructor, call `super` first if the classNameNameName extends another classNameNameName
    super();
  }

  // `render` is called whenever the component's props OR state are updated.
  render() {
    return(
<nav id="footer">
        <div className="container">
            <div className="pull-left fnav">
                <p>ALL RIGHTS RESERVED. COPYRIGHT © 2017. Designed by Team-Mavericks</p>
            </div>
            <div className="pull-right fnav">
                <ul className="footer-social">
                    <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                    <li><a href="#"><i className="fa fa-dribbble"></i></a></li>
                    <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                    <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                </ul>
            </div>
        </div>
    </nav>
    );
 }
}
export default Footer;

