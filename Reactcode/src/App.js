import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';
import Collection from './collection';
import Footer from './Footer';
import Header from './Header';
import Search from './Search';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import './App.css';


// webpack.config.js specifies index.js as the entry point, and
// index.js imports and renders this `App` component.
class App extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another classNameName
    super();
    this.toggle = this.toggle.bind(this);
    this.state = {
    dropdownOpen: false
    };
    this.state = { data: [] };
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  handleAreaSearch(ev){
      var search=document.getElementById('search-bar').value;
      var home=document.getElementById("ss");
      var area="area=";
      var searchArea = area.concat(search);
      ReactDOM.render(<Search s={searchArea}/>,home);

 }
  handleNameSearch(ev){
      var search=document.getElementById('search-bar').value;
      var home=document.getElementById("ss");
      var name="restaurantname=";
      var searchName = name.concat(search);
      ReactDOM.render(<Search s={searchName}/>,home);
 }

  // `render` is called whenever the component's props OR state are updated.
  render() {
    // console.log('The App component was rendered')
  return (
   <div>
    <Header />
    <div id="tf-home" className="text-center">
        <div className="overlay">
            <div className="content">
                <div className="txt">
                   <div className="input-group">
                       <input type="text" size ="100"  placeholder="Hungry??  Find your favourite Bistro...." className="form-control" id="search-bar"/>
                          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="input-group-btn" >
                          <DropdownToggle caret size="sm">
                          <i className="fa fa-search"></i>
                          </DropdownToggle>
                          <DropdownMenu className="menu">
                          <DropdownItem onClick={this.handleAreaSearch} id="area">Area</DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem onClick={this.handleNameSearch} id="name">Restaurant Name</DropdownItem>
                          </DropdownMenu>
                          </ButtonDropdown>
                   </div>
                </div>
                <a href="#tf-collection" className="fa fa-angle-down page-scroll"></a>
            </div>
        </div>
    </div>
    <div id="ss">
    <Collection />
    </div>
    <div className="text-center"><a href="#tf-home" className="fa fa-angle-up fa-3x"></a></div>
    <Footer />
    </div>

    );

   }
 }

export default App;
