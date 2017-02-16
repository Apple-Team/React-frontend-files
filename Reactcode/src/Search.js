 import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';
import Restaurant_detail from './Restaurant_detail';
import Footer from './Footer';
import Header from './Header';
import './ViewRest.css';

class Search extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another classNameName
    super();
    this.state = { data: [] };
  }
componentDidMount(){
   
    fetch("http://localhost:9000/search_restaurants_by_name_area?"+this.props.s)
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
  var c=document.getElementById("searchlist");  
  ReactDOM.render(<Restaurant_detail index={id}/>,c);
}
render() {
    // console.log('The App component was rendered')
  return (
 <div id="searchlist">
    <div className="card card-block">{
       this.state.data.map((data, index)=>{
        return (
           <ul>
                <li className="media">
                   <img className="d-flex mr-3" src={data.image} height="100px" width="110px" alt="Generic placeholder image"/>
                    <div className="media-body">
                         <p className="card-text"><h5 className="mt-0 mb-1">{data.name}</h5>
                             Area: {data.area}<br />
                             Working Hours: {data.workHours}
                         </p>
                    </div>
                    <button type="button" className="btn btn-warning btn-sm" onClick={() => this.handleRest(data.id)}>View</button>
                </li>
            </ul>
         )
        })
       } 
    </div> 
 </div>
     );

   }
 }

export default Search;