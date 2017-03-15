import React, { Component } from 'react';
import { Link , hashHistory } from 'react-router';
import ReactDOM from 'react-dom';
import Restaurant_detail from './Restaurant_detail';
import Footer from './Footer';
import Filters from './Filters';
import UserHeader from './UserHeader';
import Header from './Header';
import SearchComponent from './SearchComponent';
import './ViewRest.css';

class Search extends Component {
 constructor() {
   // In a constructor, call `super` first if the className extends another classNameName
   super();
  console.log('search');
  this.coll=this.coll.bind(this);
   this.state = {
   dropdownOpen: false,
   dropdownOpen1: false,
   data: [],data1:[]
   };
 }

componentWillReceiveProps(nextProps){
 console.log(nextProps);
 fetch("http://localhost:9000/filter?keyword="+nextProps.params.s)
   .then((response) => response.json())
         .then((responseJson) => {
            this.setState({
             data: responseJson

            });
         }).then(function(e){
         document.getElementById('badsrch').style.display='none';
       });
       console.log('ii1'+localStorage.getItem(this.props.params.set));

       if(nextProps.params.s!=localStorage.getItem(this.props.params.set)){
         var param=localStorage.getItem(this.props.params.set);
         fetch("http://localhost:9000/filter?keyword="+param)
           .then((response) => response.json())
                 .then((responseJson) => {
                    this.setState({
                     data1: responseJson

                    });
                 }).then(function(e){
                  document.getElementById('second').style.display='inline';
                 document.getElementById('badsrch').style.display='none';
               });
       }
}
handleRest(id)
{
 this.id=id;
 hashHistory.push('/Restaurant_detail/'+id)
}

coll(collfilter){
  if(collfilter!='')
   {
    console.log("search",collfilter);
     this.setState({data:collfilter});
     if(this.state.data!=''){
        document.getElementById('badsrch').style.display='none';
     }
     console.log(this.state.data);
  }
  else{
    this.setState({data:[]});
        document.getElementById('badsrch').style.display='block';
  }
}

render() {
   // console.log('The App component was rendered')
 return (
<div id="restlist">
 {window.sessionStorage.getItem('token') ? <UserHeader /> : <Header />}

<SearchComponent/>
   <div id="searchlist">
     <div className="restaurant-container">
         <Filters filtercoll={this.coll.bind(this)} s={this.props.params.s}/>
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
                           <h5 className="card-subtitle">{data[10]}</h5>
                           <p className="card-text"> Area: {data[2]}</p>
                           <p className="card-text">  Working Hours: {data[12]}</p>
                         </div><hr/>
                         <div className="card-bottom" id="srch">
                           <button type="button" className="btn btn-warning btn-sm"  style={{float:"right"}} onClick={()=>this.handleRest(data[0])}>View</button>
                         </div>
                   </div>
                 </div>
               </div>
             )
           })
         }

         </div>

            <div id="second"  style={{display: 'none'}}>
           <h3 className="w3-center w3-animate-top"><strong>Recommendations</strong> for you</h3>
          <hr />
           <div id="cardrow" className="row">
         <div className="card-columns" id="srch">{
             this.state.data1.map((data, index)=>{
               return (
                 <div id="srchcard" className="card w-100">
                   <div className="row" id="srch">
                     <div className="col-md-6">
                       <img id="srchimg" src={data[7]} id="srchimg" alt="Card image cap"/>
                     </div>
                     <div className="col-md-6" id="srchcard1">
                         <div className="card-top">
                           <h5 className="card-subtitle">{data[10]}</h5>
                           <p className="card-text"> Area: {data[2]}</p>
                           <p className="card-text">  Working Hours: {data[12]}</p>
                         </div><hr/>
                         <div className="card-bottom" id="srch">
                           <button type="button" className="btn btn-warning btn-sm"  style={{float:"right"}} onClick={()=>this.handleRest(data[0])}>View</button>
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
   <div id="badsrch" style={{display: 'none'}}>
      <h3><i className="fa fa-frown-o fa-3x" aria-hidden="true"></i> No Results Found!!</h3>
   </div>
 </div>

</div>
);
}
}

export default Search;