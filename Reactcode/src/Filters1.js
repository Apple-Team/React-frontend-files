import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Router, Route, hashHistory } from 'react-router';
class Filters1 extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another classNameName
    super();
     console.log('jjj1');
    this.state = { colltn:'', data: [],filter_data:[],check:''};

  }


  handleFilter1(e){
    
  	var c1,c2,cost;
  	cost=document.getElementById("cost").value;
  	console.log(cost);
  	 if(cost==1){
              c1=0;
              c2=250;
          }
        else if(cost==2){
                c1=250;
                c2=500;
        }
        else if(cost==3){
                c1=500;
                c2=1000;
        }
        else if(cost==4){
                c1=1000;
                c2=2000;
        }
        else if(cost==5){
                c1=2000;
                c2=10000;
        }
        else if(cost=='Cost per Two'){
               c1='';
               c2='';
        }
        console.log(c1,c2);
        if(!((c1=='')&&(c2=='')))
        this.props.filter(cost,c1,c2);
  }

   render() {
      return (
         <div>
            <select className="form-control form-control-sm" id="cost" onChange={this.handleFilter1.bind(this)}>
                    <option selected>Cost per Two</option>
                    <option value="1">Less than &#8377;250</option>
                    <option value="2">&#8377;250 - &#8377;500</option>
                    <option value="3">&#8377;500 - &#8377;1000</option>
                    <option value="4">&#8377;1000 - &#8377;2000</option>
                    <option value="5">&#8377;2000 above</option>
            </select>


          </div>
          );

    }
}

export default Filters1;
