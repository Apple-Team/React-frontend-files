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

    
    this.state = {
    inputValue: ''

    };
    this.state = { radius_data: [] };
    this.handleSearch=this.handleSearch.bind(this);
    this.handleChange=this.handleChange.bind(this);
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


          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
              console.log(pos);
            console.log(position.coords.latitude);
           var home=document.getElementById("ss");
           var lati=position.coords.latitude;
           var longi=position.coords.longitude;
           console.log(longi);
          hashHistory.push('/NearBy/'+lati+'/'+longi);
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
                            <Button id="Popover1" type="button" className="btn btn-warning" onClick={this.handleNearby}>
                               Locate Me <i className="fa fa-location-arrow" aria-hidden="true"></i>
                            </Button>
                            </span>
                           <input type="text" placeholder="Hungry??  Find your favourite Bistro...." onfocus="placeholder=''" size ="100" id="search-bar" ref="inputSearch" autocomplete="off" value={this.state.inputValue}
                            onChange={this.handleChange.bind(this)}  />
                           <span className="input-group-btn">
                           <button id="teamsearchbtn" type="button" className="btn btn-warning" onClick={this.handleSearch}> <i className="fa fa-search"></i></button>
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
