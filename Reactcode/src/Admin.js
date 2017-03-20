import React, { Component } from 'react';
import {Router, Route, hashHistory,Link} from 'react-router';
import AdminHeader from './AdminHeader';
import App from './App';
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
                  <AdminHeader/>
                 </div>
             </div>
            <div className="row">
                <div className="col" id="col2">
                    	<div className="content">
                				<p><x2>Welcome, {window.sessionStorage.getItem('name1')}!</x2>
                		</p>
                				</div>

                </div>
            </div>
        </div>
     </div>




 	 );
 	}
   }
   export default Admin;
