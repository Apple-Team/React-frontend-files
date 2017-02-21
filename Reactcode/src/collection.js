
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
//list view of collections
  collectionlist(name,cname){
    this.name=name;
    this.cname=cname; 
  hashHistory.push('/Collectionfetch/'+name+'/'+cname)
  }
  // `render` is called whenever the component's props OR state are updated.
  
  //detail description view
  
  render() {
    let collections = [
    {
     name:'Sunday Brunch',
     image:require('./images/sb.jpg'),
     url:'sb',
     id:'Sunday%20Brunch'
   },
   {
    name:'Frozen Delight',
    image:require('./images/fd1.jpg'),
    url:'fd',
    id:'Frozen%20Delights'
  },
  {
    name:'Street Food',
    image:require('./images/street1.jpg'),
    url:'sf',
    id:'Street%20Food'
  },
  {
    name:'Fine Dine',
    image:require('./images/dinner.jpeg'),
    url:'fd',
    id:'Fine%20Dining'
  },
  {
    name:'Barbeque & Grills',
    image:require('./images/bb.jpg'),
    url:'bg',
    id:'Barbeque%20&%20Grills'
  },
  {
    name:'Breakfast',
    image:require('./images/bf.jpg'),
    url:'bf',
    id:'Breakfast'
  }
  ]




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

            <div id="lightbox" className="row">{
              collections.map((item, index)=>{
               return (

                <div className="col-sm-6 col-md-4 col-lg-4 branding">
                    <div className="portfolio-item">
                        <div className="hover-bg">

                                <div className="hover-txt">
                                    <h4>{item.name}</h4>

                                    <div className="clearfix"></div>
                                    <button type="button" className="w3-button w3-orange w3-round-xxlarge" onClick={() => this.collectionlist(item.id,item.name)}><i className="fa fa-plus" aria-hidden="true"></i></button>
                                </div>
                                <img src={item.image} className="img-responsive" alt="..." />

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
