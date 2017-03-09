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
    this.modalOpen1=this.modalOpen1.bind(this);
    this.modalClose1=this.modalClose1.bind(this);
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
 modalOpen1(event){
   document.getElementById('Modal1').style.display = "inline-block";
 }

 modalClose1(event){
  console.log('hhh');
   document.getElementById('Modal1').style.display ="none";

 }

 handleRest(id)
{
  if(window.sessionStorage.getItem('token')){
  this.id=id;
  var lat=this.props.params.lati;
  var long=this.props.params.longi;

  hashHistory.push('/rl/'+id+'/'+lat+'/'+long)
 }
 else{
   this.modalOpen1();
 }
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
                    {data[14].toFixed(2)} kms &nbsp;
                    <button type="button" className="btn btn-warning btn-sm" onClick={() => this.handleRest(data[0])}>View</button>
                </li>
            </ul>
         )
        })
       }
    </div>
 </div>
 <div id="Modal1" className="modal">

    <form className="modal-content animate">
        <div id="modal" className="container">
          <button className="btn" onClick={()=>this.modalClose1}>&times;</button>

          <p>  please <Link to="/Login"><b>Login</b></Link> to view the page</p>
          </div>
   </form>

</div>
</div>





  );
 }
}

export default NearBy;
