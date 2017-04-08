import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link,hashHistory} from 'react-router';
import Restaurant_detail from './Restaurant_detail';
import Header from './Header';
import MultipleMarkers from './MultipleMarkers';

class Collectionfetch extends Component {
    constructor() {
    // In a constructor, call `super` first if the className extends another classNameNameNameName
    super();
    this.state = { data:[]};
    this.detailRest=this.detailRest.bind(this);
        console.log('test');
    }
  componentWillMount(){

    fetch("http://localhost:9000/collections/"+this.props.params.name)
            .then((response) => response.json())
            .then((responseJson) => {
               this.setState({
                data: responseJson

               });
            });

}


  detailRest(id){
    this.id=id;
    console.log(id);
    var l=document.getElementById("home");
    hashHistory.push('/Restaurant_detail/'+id)


}


  // `render` is called
  render() {

    console.log('The App component was rendered')
  return (
      <div id="list1">
       <div className="row">
        <div className="alert alert-warning text-center" role="alert">
           <h2><strong> {this.props.params.name}</strong></h2>
        </div>
        <div className="card-deck" id="collcard">{
           this.state.data.map((data,index)=>{
            return (

            <div className="card card-outline-warning mb-3 text-center" >
                <img className="card-img img-fluid" src={data.image} id="cardimg" alt="Card image cap"/>
                <div className="card-block">
                    <h5 className="card-subtitle"><span id="stext">{data.name}</span></h5><br/>
                    
                    <p className="card-text"><span id="subtext">{data.area}</span></p>
                </div>
                <div className="card-footer">
                    <button type="button" className="btn btn-warning btn-sm" onClick={()=>this.detailRest(data.id)}>View More</button>
                </div>
            </div>)
          })
        }
        </div>
       </div>
       <div className="alert alert-warning text-center" role="alert">
          <h2><strong> Map View</strong></h2>
       </div>
       <div className="row w3-center" style={{height:"100%",width:"100%"}}>
          <div className="card card-outline-warning mb-3 " style={{height:"100%",width:"100%"}}>
                <MultipleMarkers name={this.props.params.name} />
          </div>
       </div>
     </div>
    );

   }
 }

export default Collectionfetch;