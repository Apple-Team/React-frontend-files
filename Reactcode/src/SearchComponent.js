import React, { Component } from 'react';
import {Link,hashHistory} from 'react-router';
import ReactDOM from 'react-dom';
import Header from './Header';
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
var i=0;
var input=new Array(1000);
  class SearchComponent extends Component {

    constructor() {
    // In a constructor, call `super` first if the className extends another className
    super();


    this.state = {
    inputValue: '',
    radius_data: [],
    popoverOpen1: false
  };
    this.handleSearch=this.handleSearch.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.toggle1 = this.toggle1.bind(this);
  }

toggle1() {
    this.setState({
      popoverOpen1: !this.state.popoverOpen1
    });
  }

  handleSearch(ev){
      console.log(this.state.inputValue);
      if(this.state.inputValue==''){
        this.setState({
      popoverOpen1:true
    });
      }
      else{
        this.setState({
      popoverOpen1:false
    });
    if(window.sessionStorage.getItem('token')){
      var item=window.sessionStorage.getItem('name');
      localStorage.setItem('username',item );
      var set=localStorage.getItem('username');
      console.log('hh'+set);
      localStorage.setItem(input[i],this.state.inputValue);
      var get=localStorage.getItem(input[i]);
      localStorage.setItem(set,get);
      console.log('ii'+localStorage.getItem(set));
      i++;
    }
      hashHistory.push('/Search/'+this.state.inputValue+'/'+set);
    }


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
    <div id="tf-nearby">
            <div className="content">
                <div className="txt">
                   <div className="form-group">
                      <div className="input-group text-center" id="srchbar">
                            <span className="input-group-btn">
                            <Button id="Popover1" type="button" className="btn btn-warning" onClick={this.handleNearby}>
                               Locate Me <i className="fa fa-location-arrow" aria-hidden="true"></i>
                            </Button>
                            </span>
                           <input type="text" placeholder="Hungry??  Find your favourite Bistro...." onfocus="placeholder=''"  className="form-control" size ="100" id="search-bar" autocomplete="on" value={this.state.inputValue}
                            onChange={this.handleChange.bind(this)}  />
                           <span className="input-group-btn" id="s">
                           <button id="teamsearchbtn" type="button" className="btn btn-warning" onClick={this.handleSearch}> <i className="fa fa-search"></i></button>
                           </span>
                      </div>
                    </div>

                </div>

        </div>
   </div>
</div>
 <div id="pop_search">
        <Popover placement="bottom" isOpen={this.state.popoverOpen1} target="search-bar" toggle={this.toggle1}>
          <PopoverContent>Please enter a value</PopoverContent>
        </Popover>
      </div>


</div>
);
}
}
export default SearchComponent;