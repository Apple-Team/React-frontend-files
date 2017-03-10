 import React, { Component } from 'react';
import { Link , hashHistory } from 'react-router';
import ReactDOM from 'react-dom';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import Restaurant_detail from './Restaurant_detail';
import Footer from './Footer';
import Header from './Header';
import SearchComponent from './SearchComponent';
import './ViewRest.css';

class Search extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another classNameName
    super();
    this.toggle = this.toggle.bind(this);
    this.toggle1 = this.toggle1.bind(this);
    this.state = {
    dropdownOpen: false,
    dropdownOpen1: false
    };
    this.state = { data: [] };
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
componentWillReceiveProps(nextProps){
  console.log(nextProps);
  fetch("http://localhost:9000/search_restaurants/"+nextProps.params.s)
    .then((response) => response.json())
          .then((responseJson) => {
             this.setState({
              data: responseJson

             });
          });
}
 handleRest(id)
{
  this.id=id;
  hashHistory.push('/Restaurant_detail/'+id)
}

render() {
    // console.log('The App component was rendered')
  return (
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
    <div id="searchlist">
      <div className="restaurant-container">
        <div id="cardrow" className="row">
          <div className="card-columns" id="srch">{
              this.state.data.map((data, index)=>{
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
                          <div className="card-bottom" id="srch">
                            <button type="button" className="btn btn-warning btn-sm" onClick={()=>this.handleRest(data[0])}>View</button>
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

export default Search;
