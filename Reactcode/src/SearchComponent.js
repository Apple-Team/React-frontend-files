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
    this.toggle = this.toggle.bind(this);
    this.toggle1 = this.toggle1.bind(this);
    this.togglePop = this.togglePop.bind(this);
    this.state = {
    dropdownOpen: false,
    popoverOpen: false,
    dropdownOpen1: false
    };
    this.state = { radius_data: [] };
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
  toggle1() {
    this.setState({
      dropdownOpen1: !this.state.dropdownOpen1
    });
  }
render() {

  return(
    <div>

<div id="nearby">
    <div id="tf-nearby" className="text-center">
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
            </div>
        </div>
   </div>
</div>


</div>
);
}
} 
export default SearchComponent;