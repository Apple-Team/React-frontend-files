import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link,hashHistory } from 'react-router';
import Collectionfetch from './Collectionfetch';
var collnames=new Array();

class collection extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another classNameNameNameName
    super();
     this.collectionlist=this.collectionlist.bind(this);

    this.state = { data: [] };
  }
  componentWillMount(){
console.log("helo");
    fetch("http://localhost:9000/get_all_collections")
            .then((response) => response.json())
            .then((responseJson) => {
               this.setState({
                data: responseJson

               });
            });

    }
//list view of collections
  collectionlist(name,cname){
    this.name=name;
    this.cname=cname;
  hashHistory.push('/Collectionfetch/'+name)
  }
  // `render` is called whenever the component's props OR state are updated.

  //detail description view

render() {
localStorage.setItem("collnames",JSON.stringify(this.state.data));
              console.log("hel");
return (
  <div id="content2">
  <div id="tf-collection">
        <div className="container">

            <div className="w3-container">
                <h1 className="w3-center w3-animate-right">Take a look at our <strong>Collections</strong></h1>
                <div className="line">
                    <hr />
                </div>
                <div className="clearfix"></div>

            </div>
            <div className="space"></div>

            <div id="lightbox" className="row w3-center">{
              this.state.data.map((data,index)=>{
               return (

                <div className="col-sm-5 col-md-3 col-lg-4 branding">
                    <div className="portfolio-item">
                        <div className="hover-bg">

                                <div className="hover-txt">
                                    <h4>{data.collection}</h4>

                                    <div className="clearfix"></div>
                                    <button type="button" className="w3-button w3-orange w3-round-xxlarge" onClick={() => this.collectionlist(data.collection)}><i className="fa fa-plus" aria-hidden="true"></i></button>
                                </div>
                                <img src={data.collectionUrl} id="collimg" className="img-responsive" alt="..." />

                        </div>
                    </div>
                  </div>)
                })
              }
             </div>

        </div>
    </div>


  </div>

 );
 }
}
export default collection;