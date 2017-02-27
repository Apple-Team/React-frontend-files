import React, { Component } from 'react';
import { Link ,hashHistory} from 'react-router';
import ReactDOM from 'react-dom';
import Collection from './collection';
import Footer from './Footer';
import Header from './Header';
import Search from './Search';
import NearBy from './NearBy';
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
    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false,
    dropdownOpen: false
    };
    this.state = { data: [] };
  }

   togglePop() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
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
      document.getElementById('home').focus;
      ReactDOM.render(<Search s={searchName}/>,home);
 }

 handleNearby(){

        // Try HTML5 geolocation.
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            console.log(position.coords.latitude);
           var radius=document.getElementById('radius').value;
           var home=document.getElementById("ss");
           var lati=position.coords.latitude;
           var longi=position.coords.longitude;
           console.log(lati);
          hashHistory.push('/NearBy/'+lati+'/'+longi+'/'+radius);
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
        <div className="overlay">
            <div className="content">
                <div className="txt">
                   <div className="input-group">
                       <input type="text" size ="100"  placeholder="Hungry??  Find your favourite Bistro...." className="form-control" id="search-bar"/>
                          <ButtonDropdown id="searchdrop" isOpen={this.state.dropdownOpen} toggle={this.toggle} className="input-group-btn" >
                          <DropdownToggle caret size="sm">
                          <i className="fa fa-search"></i>
                          </DropdownToggle>
                          <DropdownMenu className="menu">
                          <DropdownItem onClick={this.handleAreaSearch} id="area">Area</DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem onClick={this.handleNameSearch} id="name">Restaurant Name</DropdownItem>
                          </DropdownMenu>
                          </ButtonDropdown>
                          <div>&nbsp;&nbsp;
        <Button id="Popover1" onClick={this.togglePop}>
          Locate Me <i className="fa fa-location-arrow" aria-hidden="true"></i>
        </Button>
        <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" togglePop={this.togglePop}>
          <PopoverTitle>Please enter the distance in km</PopoverTitle>
          <PopoverContent><input type="text" size ="10"  placeholder="Enter radius in km" className="form-control" id="radius"/><button onClick={this.handleNearby}><i className="fa fa-search"></i></button></PopoverContent>
        </Popover>
        </div>
      
                   </div>
                   
                </div>
                <a href="#tf-collection" className="fa fa-angle-down page-scroll"></a>
            </div>
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
