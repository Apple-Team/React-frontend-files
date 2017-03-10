import React, { Component } from 'react';
import {Link,hashHistory} from 'react-router';
import ReactDOM from 'react-dom';
import Header from './Header';
import SearchComponent from './SearchComponent';
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
  class NearBy extends Component {

    constructor() {
    // In a constructor, call `super` first if the className extends another className
    super();
    this.toggle = this.toggle.bind(this);
    this.toggle1 = this.toggle1.bind(this);
    this.state = {
    dropdownOpen: false,
    dropdownOpen1: false
    };
    this.state = { radius_data: [] };
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

  componentWillMount(){

    fetch("http://localhost:9000/search_nearby_restaurants/"+this.props.params.lati+"?longitude="+this.props.params.longi)
      .then((response) => response.json())
            .then((responseJson) => {
               this.setState({
                radius_data: responseJson

               });
            });

 }

 handleRest(id)
{
  this.id=id;
  var lat=this.props.params.lati;
  var long=this.props.params.longi;
  hashHistory.push('/rl/'+id+'/'+lat+'/'+long);
 }

  render() {

  return(
    <div>
    <Header />
    <SearchComponent/>

        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} size="sm" className="input-group-btn" >
        <DropdownToggle caret size="sm">
           Filter By
        </DropdownToggle>
        <DropdownMenu className="menu" right>
             <DropdownItem  id="cuisine">Cuisine</DropdownItem>
             <DropdownItem divider />
              <ButtonDropdown isOpen={this.state.dropdownOpen1} toggle={this.toggle1} size="sm" className="input-group-btn" >
                    <DropdownToggle caret size="sm">
                        Opening Hours
                    </DropdownToggle>
                     <DropdownMenu className="menu">
                          <DropdownItem  id="cuisine">9AM -9PM</DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem id="openHours">10PM -3AM</DropdownItem>
                    </DropdownMenu>
             </ButtonDropdown>
             </DropdownMenu>
    </ButtonDropdown>
  <div id="restlist">
    <div className="restaurant-container">
      <div id="cardrow" className="row">
        <div className="card-columns" id="srch">{
       this.state.radius_data.map((data, index)=>{
        return (
          <div id="srchcard" className="card w-100">
            <div className="row" id="srch">
              <div className="col-md-6">
                <img id="srchimg" src={data[7]} id="srchimg" alt="Card image cap"/>
              </div>
              <div className="col-md-6" id="srchcard1">
                  <div className="card-top">
                    <h5 className="card-title">{data[10]}</h5>
                    <p className="card-text"> Area: {data[2]}</p>
                    <p className="card-text">  Working Hours: {data[12]}</p>
                  </div>
                  <hr />
                  <div id="srch">
                    <p className="card-text" style={{float:"left"}}>{data[18].toFixed(2)} kms away</p>
                    <button type="button" style={{float:"right"}} className="btn btn-warning btn-sm" onClick={()=>this.handleRest(data[0])}>View</button>
                  </div>
            </div>
          </div>
        </div>
         )
        })
       }
    </div>
  </div>
</div>
</div>
</div>





  );
 }
}

export default NearBy;
