
import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';
import Restaurant_detail from './Restaurant_detail';

class Collection extends Component {
  constructor() {
    // In a constructor, call `super` first if the classNameNameNameName extends another classNameNameNameName
    super();
     this.collectionlist=this.collectionlist.bind(this);
     this.detailRest=this.detailRest.bind(this);
    this.state = { data: [],detail_data:[],collection:'' };
  }
//list view of collections
  collectionlist(name,cname){
    this.name=name;
    this.cname=cname;
     fetch("http://localhost:9000/restaurants_by_collection/"+name)
            .then((response) => response.json())
            .then((responseJson) => {
               this.setState({
                data: responseJson

               });
            });
    document.getElementById('list').style.display = "block";
  }
  // `render` is called whenever the component's props OR state are updated.
  
  //detail description view
  detailRest(id){
    this.id=id;
    console.log(id);
  var l=document.getElementById("list");  
  ReactDOM.render(<Restaurant_detail index={id}/>,l);

  }


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

            <div className="section-title text-center center">

                <h2>Take a look at our <strong>Collections</strong></h2>
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
                                    <button type="button" onClick={() => this.collectionlist(item.id,item.name)}><i className="fa fa-plus"></i></button>
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
    <div id="list" className="modal">
    
        <div className="alert alert-warning" role="alert">
           <h2><strong> {this.cname}</strong></h2>
        </div>
        <div className="card-deck">{
           this.state.data.map((data, index)=>{
            return (

            <div className="card card-outline-warning mb-3 text-center" >
                <img className="card-img" src={data.image} alt="Card image cap"/>
                <div className="card-block">
                    <h5 className="card-subtitle">{data.name}</h5>
                    <p className="card-text">{data.cuisine}</p>
                    <p className="card-text">{data.area}</p>
                    <button type="button" className="btn btn-warning btn-sm" onClick={()=>this.detailRest(data.id)}>View More</button>
                </div>
            </div>)
          })
        }
        </div>
     </div>
    
  </div>

 );
 }
}
export default Collection;
