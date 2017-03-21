import React, { Component } from 'react';
import { Link ,hashHistory} from 'react-router';
import ReactDOM from 'react-dom';
import Collection from './collection';
import Footer from './Footer';
import Header from './Header';
import Search from './Search';
import NearBy from './NearBy';
import MainView from './MainView';
import SearchComponent from './SearchComponent';
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import './App.css';


// webpack.config.js specifies index.js as the entry point, and
// index.js imports and renders this `App` component.
class App extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another classNameName
    super();
    this.state = { data: [] };
  }

  // `render` is called whenever the component's props OR state are updated.
  render() {
    // console.log('The App component was rendered')
  return (
   <div id="dd">
    <Header />
    <div id="home">
    <div id="tf-home" className="text-center">
    <div><span id="Main_Title" className="text-center">Hungry??<br/>  Find your favourite Bistro...</span></div>
    <SearchComponent />
        <div className="overlay">
                <a href="#tf-collection" className="fa fa-angle-down page-scroll"></a>
        </div>
   </div>

    <div id="ss">
    <div className="container w3-center">
          <br/><br/>
          <h1 id="aboutus"> <strong>What we Believe in!</strong></h1>
          <hr/>
          <MainView />
    </div>
    </div>
    <div id="coll">
       <br/>
       <br/>
       <br/>
    </div>
    <div id="ss">
    <Collection />
    </div>
    <div className="text-center"><a href="#tf-home" className="fa fa-angle-up fa-3x"></a></div>

    <Footer />
    </div>
  </div>

    );

   }
 }

export default App;
