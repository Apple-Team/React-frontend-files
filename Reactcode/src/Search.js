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
  var that=this;
 console.log(nextProps);
 fetch("http://localhost:9000/filter_restaurants?keyword="+nextProps.params.s)
   .then((response) => response.json())
         .then((responseJson) => {
            that.setState({
             data: responseJson

            });
         }).then(function(e){

         if(that.state.data==null)
            document.getElementById('badsrch').style.display='block';
        else {
           document.getElementById('badsrch').style.display='none';
        }
       });

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
<div id="tf-home">
 {window.sessionStorage.getItem('token') ? <UserHeader /> : <Header />}

<SearchComponent/>
   <div id="searchlist">
     <div className="container restaurant-container">

       <div id="cardrow" className="row">
          <div className="col-md-2">
            <Filters filtercoll={this.coll.bind(this)} s={this.props.params.s}/>
         </div>
         <div className="col-md-5">
         <div id="srch1">{
             this.state.data.map((data, index)=>{
               return (
                 <div id="srchcard" className="card w-100">
                   <div className="row" id="srch">
                     <div className="col-md-6">
                       <img id="srchimg" src={data[7]} id="srchimg" alt="Card image cap"/>
                     </div>
                     <div className="col-md-6" id="srchcard2">
                         <div className="card-top">
                           <h5 className="card-subtitle"><span id="stext"> {data[10]}</span></h5><br/>
                           <p className="card-text">
                           <span id="subtext"> {data[2]}<br/>
                                {data[12]}</span></p>
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
     <div id="badsrch" style={{display: 'none'}}>
         <h3><i className="fa fa-frown-o fa-3x" aria-hidden="true"></i> No Results Found!!</h3>
     </div>

     </div>

    </div>

  </div>

 </div>

</div>
);
}
}

export default Search;
