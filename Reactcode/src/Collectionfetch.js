import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link,hashHistory} from 'react-router';
import Restaurant_detail from './Restaurant_detail';
import Header from './Header';

class Collectionfetch extends Component {
    constructor() {
    // In a constructor, call `super` first if the classNameNameNameName extends another classNameNameNameName
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

        <div className="alert alert-warning" role="alert">
           <h2><strong> {this.props.params.name}</strong></h2>
        </div>
        <div className="card-deck">{
           this.state.data.map((data,index)=>{
            return (

            <div className="card card-outline-warning mb-3 text-center" >
                <img className="card-img-top img-fluid" src={data.image} alt="Card image cap"/>
                <div className="card-block">
                    <h5 className="card-subtitle">{data.name}</h5>
                    <p className="card-text">{data.cuisine}</p>
                    <p className="card-text">{data.area}</p>
                </div>
                <div className="card-footer">
                    <button type="button" className="btn btn-warning btn-sm" onClick={()=>this.detailRest(data.id)}>View More</button>
                </div>
            </div>)
          })
        }
        </div>
     </div>
    );

   }
 }

export default Collectionfetch;
