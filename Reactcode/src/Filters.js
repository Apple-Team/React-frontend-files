import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Router, Route, hashHistory } from 'react-router';
class Filters extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another classNameName
    super();
     console.log('jjj');
    this.state = { colltn:'', data: [],filter_data:[],check:''};
    this.handleFilter=this.handleFilter.bind(this);

  }
  componentDidMount(){

  fetch("http://localhost:9000/get_all_collections")
    .then((response) => response.json())
          .then((responseJson) => {
             this.setState({
              data: responseJson

             });
          });
  }
 handleFilter(e) {
     var that=this;
     var cf,c1,c2,cost;
     that.state.colltn= document.getElementById('collection').value;
     that.state.check=document.getElementById('delivery').checked;
     cost=document.getElementById('cost').value;
     console.log(that.state.check);
     console.log(cost);
      if(that.state.check==true)
          that.state.check='1';
      else that.state.check='0';
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
        else{
          c1=0;
          c2=10000;
        }


     console.log(that.state.colltn);
     if(that.state.check)
        cf=that.props.s+"&delivery="+that.state.check;
     if(cost>=1){
       console.log(c1);
        cf=that.props.s+"&cost1="+c1+"&cost2="+c2;
      }
     if(!that.state.colltn)
        cf=that.props.s+"&collection="+that.state.colltn;
     if(that.state.check&&(this.state.colltn=='1')){
       cf=that.props.s+"&collection="+that.state.colltn+"&delivery="+that.state.check;

     }
     console.log(cf);

    fetch("http://localhost:9000/filter?keyword="+cf)
    .then((response) => response.json())
     .then((responseJson) => {
        that.setState({
         filter_data: responseJson

       });
     }).then(function(e){
               console.log(that.state.filter_data);
               that.props.filtercoll(that.state.filter_data);
       });

  }

   render() {
      return (
         <div>
            <div className="card"  id="filtersrch" >
          <h4 className="card-subtitle">Filters</h4><hr/>
          <h5 className="card-text" style={{paddingLeft:"1px"}}> Collections </h5>
          <div style={{paddingLeft:"2px"}}>{
          this.state.data.map((data,index)=>{
           return (
          <FormGroup tag="fieldset">
           <FormGroup check>
            <Label check>
              <Input type="radio" name="radio1"  id="collection" value={data.collection}  onClick={this.handleFilter.bind(this)}/>{' '}
            {data.collection}
            </Label>
          </FormGroup>
        </FormGroup>)}
        )}
      </div><hr/>
         <h5 className="card-text" style={{paddingLeft:"1px"}}> Cost </h5>
            <select className="form-control form-control-sm" id="cost" onChange={this.handleFilter.bind(this)}>
                    <option selected>Cost per Two</option>
                    <option value="1">Less than &#8377;250</option>
                    <option value="2">&#8377;250 - &#8377;500</option>
                    <option value="3">&#8377;500 - &#8377;1000</option>
                    <option value="4">&#8377;1000 - &#8377;2000</option>
                    <option value="5">&#8377;2000 above</option>
            </select>
            <hr/>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" id="delivery" onClick={this.handleFilter.bind(this)}/>{' '}
                Home Delivery
              </Label>
            </FormGroup>

       </div>
         </div>
      );

    }
}

export default Filters;
