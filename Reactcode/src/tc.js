import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
class TextCarousel extends Component {
   render() {
      return (
         <div>
            
<div id="text-carousel" className="carousel slide" data-ride="carousel">
    <div className="row">
        <div className="col-xs-offset-3 col-xs-6">
            <div className="carousel-inner">
                <div className="item active">
                    <div className="carousel-content">
                        <div>
                            <p>Sapiente, ducimus, voluptas, mollitia voluptatibus nemo explicabo sit blanditiis laborum dolore illum fuga veniam quae expedita libero accusamus quas harum ex numquam necessitatibus provident deleniti tenetur iusto officiis recusandae corporis culpa quaerat?</p>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="carousel-content">
                        <div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, sint fuga temporibus nam saepe delectus expedita vitae magnam necessitatibus dolores tempore consequatur dicta cumque repellendus eligendi ducimus placeat! </p>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="carousel-content">
                        <div>                          
                            <p>Sapiente, ducimus, voluptas, mollitia voluptatibus nemo explicabo sit blanditiis laborum dolore illum fuga veniam quae expedita libero accusamus quas harum ex numquam necessitatibus provident deleniti tenetur iusto officiis recusandae corporis culpa quaerat?</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
 <a className="left carousel-control" href="#text-carousel" data-slide="prev">
    <i className="fa fa-arrow-left" aria-hidden="true"></i>
  </a>
 <a className="right carousel-control" href="#text-carousel" data-slide="next">
    <i className="fa fa-arrow-right" aria-hidden="true"></i>
  </a>

</div>

         </div>
      )
   }
}

export default TextCarousel;