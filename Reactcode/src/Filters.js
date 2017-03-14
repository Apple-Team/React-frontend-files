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
    this.onCollChanged=this.onCollChanged.bind(this);
        this.onInputChanged=this.onInputChanged.bind(this);
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
     var that=this;
     var cf;
     console.log(e.currentTarget.value);
     that.state.colltn= e.currentTarget.value;
     console.log(that.state.colltn);
     console.log(that.state.check);
     if(that.state.check){
       cf=that.props.s+"&collection="+that.state.colltn+"&delivery="+that.state.check;
       console.log(cf);
     }
     else {
       cf=that.props.s+"&collection="+that.state.colltn;
       console.log(cf);
     }
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

  onInputChanged(e) {
    var that=this;
    var hd;
  	that.state.check=e.currentTarget.checked;
    if(that.state.check==true)
        that.state.check='1';
    else that.state.check='0';
    console.log(that.state.check);
    if(that.state.colltn){
      hd="&collection="+that.state.colltn+"&delivery="+that.state.check;
    }
    else {
      hd="&delivery="+that.state.check;
    }
    fetch("http://localhost:9000/filter?keyword="+that.props.s+hd)
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
              <Input type="radio" name="radio1"  id="collection" value={data.collection}  onChange={this.onCollChanged.bind(this)}/>{' '}
            {data.collection}
            </Label>
          </FormGroup>
        </FormGroup>)}
        )}
      </div><hr/>
         <h5 className="card-text" style={{paddingLeft:"1px"}}> Cost </h5>
            <select className="form-control form-control-sm" id="cost">
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
                <Input type="checkbox"  onClick={this.onInputChanged.bind(this)}/>{' '}
                Home Delivery
              </Label>
            </FormGroup>

       </div>
         </div>
      );

    }
}

export default Filters;
