import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Router, Route, hashHistory } from 'react-router';
class Filters extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another classNameName
    super();
     console.log('jjj'); 
    this.state = { colltn:'', data: [],filter_data:[] };
    this.onCollChanged=this.onCollChanged.bind(this);
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
  onCollChanged(e) {
    console.log(e.currentTarget.value); 
    this.setState({
      colltn: e.currentTarget.value
      });
    if(this.state.colltn){
    fetch("http://localhost:9000/filter?keyword="+this.props.s+"&collection="+this.state.colltn)
    .then((response) => response.json())
          .then((responseJson) => {
             this.setState({
              filter_data: responseJson
             });
          }).then(function(e){
              console.log(this.state.filter_data);
               this.props.filtercoll(this.state.filter_data);
           });
     }
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
              <Input type="radio" name="radio1"  id="collection" value={data.collection} checked={this.state.coll === data.collection} onChange={this.onCollChanged.bind(this)}/>{' '}
            {data.collection}
            </Label>
          </FormGroup>          
        </FormGroup>)}
        )}            
      </div><hr/>
         <h5 className="card-text" style={{paddingLeft:"1px"}}> Cost </h5> 
            <select className="form-control form-control-sm" id="role">
                    <option selected>Cost per Two</option>
                    <option value="1">Less than &#8377;250</option>
                    <option value="2">&#8377;250 - &#8377;500</option>
                    <option value="3">&#8377;500 - &#8377;1000</option>
                    <option value="4">&#8377;1000 - &#8377;2000</option>
                    <option value="5">&#8377;2000 above</option>
            </select>
            <hr/>
        <div className="form-check">
               <label className="form-check-label">
                  <input type="checkbox" className="form-check-input"  name="free_delivery" value="1"/>Home Delivery
               </label>
            </div>
     
       </div>
         </div>
      );
             
    }
}

export default Filters;