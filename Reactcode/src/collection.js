import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link,hashHistory } from 'react-router';
import Collectionfetch from './Collectionfetch';

class collection extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another classNameNameNameName
    super();
     this.collectionlist=this.collectionlist.bind(this);

    this.state = { data: [] };
  }
  componentWillMount(){

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

return (
  <div id="content1">
  <div id="tf-collection">
        <div className="container">

            <div className="w3-container">
                <h3 className="w3-center w3-animate-top">Take a look at our <strong>Collections</strong></h3>
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