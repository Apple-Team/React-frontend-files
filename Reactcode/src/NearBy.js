import React, { Component } from 'react';
import {Link,hashHistory} from 'react-router';
import ReactDOM from 'react-dom';
import Header from './Header';
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
   
    fetch("http://localhost:9000/search_nearby_restaurants/"+this.props.params.lati+"?longitude="+this.props.params.longi+"&distance="+this.props.params.radius)
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
  hashHistory.push('/Restaurant_detail/'+id)
}

  render() {

  return(
    <div>

    <Header />
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
    <div className="card card-block">{
       this.state.radius_data.map((data, index)=>{
        return (
           <ul>
                <li className="media">
                   <img className="d-flex mr-3" src={data[7]} height="100px" width="110px" alt="Generic placeholder image"/>
                    <div className="media-body">
                         <p className="card-text"><h5 className="mt-0 mb-1">{data[10]}</h5>
                             Area: {data[2]}<br />
                             Working Hours: {data[12]}
                         </p>
                    </div>
                    <button type="button" className="btn btn-warning btn-sm" onClick={() => this.handleRest(data[0])}>View</button>
                </li>
            </ul>
         )
        })
       } 
    </div> 
 </div>
</div>
</div>




  );
 }
}

export default NearBy;