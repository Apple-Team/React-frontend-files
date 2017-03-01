import React, { Component } from 'react';
import { Link ,hashHistory} from 'react-router';
import ReactDOM from 'react-dom';
import Collection from './collection';
import Footer from './Footer';
import Header from './Header';
import Search from './Search';
import NearBy from './NearBy';
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
    this.togglePop = this.togglePop.bind(this);

    this.state = {
      popoverOpen: false,

    };
    this.state = { data: [] };
  }

   togglePop() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }




  // `render` is called whenever the component's props OR state are updated.
  render() {
    // console.log('The App component was rendered')
  return (
   <div id="dd">
    <Header />
    <div id="home">
    <div id="tf-home" className="text-center">
    <SearchComponent />
        <div className="overlay">
                <a href="#tf-collection" className="fa fa-angle-down page-scroll"></a>      
        </div>
    </div>
    <div id="ss">
    <Collection />

    <div className="text-center"><a href="#tf-home" className="fa fa-angle-up fa-3x"></a></div>
    </div>
    <Footer />
    </div>
  </div>

    );

   }
 }

export default App;
