import React, { Component } from 'react';
import { Link,hashHistory } from 'react-router';
import ReactDOM from 'react-dom';
import Restaurant_detail from './Restaurant_detail';
import UpdateRest from './UpdateRest';
import AddRest from './AddRest';
import UserHeader from './UserHeader';
import './Admin.css';
var key;
// webpack.config.js specifies index.js as the entry point, and
// index.js imports and renders this `App` component.
class srchHistory extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another className
    super();

    this.state = {
    data: [],
    get_data: []
  };

    console.log('test');
  }

 componentWillMount(){
   var key1=localStorage.getItem("key");
   var key2=key1.split(',');
   console.log(key2);
   var recvd_name=window.sessionStorage.getItem('name');
   console.log(key1);
   console.log(localStorage.getItem("names123"));
   var name=localStorage.getItem("names123");
   var count=localStorage.getItem("count1");
   if(count!=0){
     if(recvd_name==name){
         for(var i=0;i<count;i++){
           console.log(key2[i]);
            fetch("http://localhost:9000/filter_restaurants?keyword="+key2[i])
              .then((response) => response.json())
                    .then((responseJson) => {
                       this.setState({
                        data: responseJson

                       });
                    });
             }
   }

   }
}

handleRest(id)
{
  this.id=id;
  var c=document.getElementById("content");
  hashHistory.push('/Restaurant_detail/'+id)

}





  // `render` is called whenever the component's props OR state are updated.
  render() {
 console.log(this.state.data);
   return(
  <div>
      <div className="row">
               <div className="col" id="col1">
                   <UserHeader/>
                 </div>
             </div>
    <div>{

      this.state.data.map((data,index) => {
        return (
         <ul>
          <div className="card card-block" id="redirect">
            <li className="media">

              <img className="d-flex mr-3" src={data[7]} height="100px" width="110px" alt="Generic placeholder image"/>
              <div className="media-body">
                   <p className="card-text"><h5 className="mt-0 mb-1">{data[10]}</h5>
                      Area: {data[2]}<br />
                      Working Hours: {data[12]}
                   </p>
                </div>
              <button type="button" className="btn btn-warning btn-sm" onClick={() => this.handleRest(data[0])}>View Restaurant Page</button>&nbsp;

            </li>
            </div>
          </ul>

        )}
      )}
    </div>



  </div>
  );
     }
   }

  export default srchHistory;
