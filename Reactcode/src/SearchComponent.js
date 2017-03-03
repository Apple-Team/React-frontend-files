import React, { Component } from 'react';
import {Link,hashHistory} from 'react-router';
import ReactDOM from 'react-dom';
import Header from './Header';
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
  class SearchComponent extends Component {

    constructor() {
    // In a constructor, call `super` first if the className extends another className
    super();

    this.togglePop = this.togglePop.bind(this);
    this.state = {
    inputValue: '',
    popoverOpen: false

    };
    this.state = { radius_data: [] };
    this.handleSearch=this.handleSearch.bind(this);
    this.handleNearby=this.handleNearby.bind(this);
    this.handleChange=this.handleChange.bind(this);
  }
 togglePop() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  handleSearch(ev){
      console.log(this.state.inputValue);
      hashHistory.push('/Search/'+this.state.inputValue);

 }
 handleChange(e) {
     this.setState({ inputValue: document.getElementById("search-bar").value });
     console.log(this.state.inputValue);

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

render() {

  return(
    <div>

<div id="nearby">
    <div id="tf-nearby" className="text-center">

            <div className="content">
                <div className="txt">
                   <div className="form-group">
                      <div className="input-group">
                            <span className="input-group-btn">
                            <Button id="Popover1" type="button" className="btn btn-default" onClick={this.togglePop}>
                               Locate Me <i className="fa fa-location-arrow" aria-hidden="true"></i>
                            </Button>
                            </span>
                            <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" togglePop={this.togglePop}>
                            <PopoverTitle>Please enter the distance in km</PopoverTitle>
                            <PopoverContent><input type="text" size ="10"  placeholder="Enter radius in km" className="form-control" id="radius"/><button onClick={this.handleNearby.bind(this)}><i className="fa fa-search"></i></button></PopoverContent>
                            </Popover>
                           <input type="text" placeholder="Hungry??  Find your favourite Bistro...." size ="100" id="search-bar" ref="inputSearch" autocomplete="off" value={this.state.inputValue}
                            onChange={this.handleChange.bind(this)}  />
                           <span className="input-group-btn">
                           <button id="teamsearchbtn" type="button" className="btn btn-default" onClick={this.handleSearch}> <i className="fa fa-search"></i></button>
                           </span>
                      </div>
                    </div>

                </div>

        </div>
   </div>
</div>


</div>
);
}
}
export default SearchComponent;
