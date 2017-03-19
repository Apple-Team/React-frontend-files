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

   <div id="carouselExampleControls" className="carousel slide" data-ride="carousel" data-interval="3000">
  <div className="carousel-inner" role="listbox">
    <div className="carousel-item active">
      <img className="d-block img-fluid" src={require('./images/bf.jpg')} alt="First slide"/>
    </div>
    <div className="carousel-item">
      <img className="d-block img-fluid" src={require('./images/fd.jpg')} alt="Second slide"/>
    </div>
    <div className="carousel-item">
      <img className="d-block img-fluid" src={require('./images/bb.jpg')} alt="Third slide"/>
    </div>
  </div>
  <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
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
