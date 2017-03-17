import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

class TxtCarousel extends Component {
   render() {
   
      return (
         <div id="text-carousel">          
<div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
  <div className="carousel-inner" role="listbox">
    <div className="carousel-item active">
      <img className="d-block img-fluid" src={require('./images/1.png')} alt="First slide"/>
    </div>
    <div className="carousel-item">
      <img className="d-block img-fluid" src={require('./images/2.png')} alt="Second slide"/>
    </div>
    <div className="carousel-item">
      <img className="d-block img-fluid" src={require('./images/2.png')} alt="Third slide"/>
    </div>
  </div>
  <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <i className="fa fa-arrow-left" aria-hidden="true"></i>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
     <i className="fa fa-arrow-right" aria-hidden="true"></i>
    <span className="sr-only">Next</span>
  </a>
</div>

         </div>
      )
   }
}

export default TxtCarousel;