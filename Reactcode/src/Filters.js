import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Router, Route, hashHistory } from 'react-router';
import Filters1 from './Filters1';
var c1,c2,cost;
class Filters extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another classNameName
    super();
     console.log('jjj');
    this.state = { colltn:'', data: [],filter_data:[],check:''};
    this.handleFilter=this.handleFilter.bind(this);
    this.handleFilters=this.handleFilters.bind(this);
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

  

  handleParams(c,cost1,cost2){
    cost=c;
    c1=cost1;
    c2=cost2;
    console.log(cost,c1,c2);
    this.handleFilters();
  }

 handleFilter(e) {
  console.log(cost,c1,c2);
     var that=this;

     that.state.colltn=e.currentTarget.value;
     that.state.check=document.getElementById('delivery').checked;

     console.log(that.state.check);

      if(that.state.check==true)
          that.state.check='1';
      else that.state.check='0';

     console.log(that.state.colltn);
     this.handleFilters();
}
handleFilters(e){
     var that=this;
     var cf;
     if(that.state.check=='1')
        cf=that.props.s+"&delivery="+that.state.check;

     if(cost){
        cf=that.props.s+"&cost1="+c1+"&cost2="+c2;
      }

     if(that.state.colltn)
        cf=that.props.s+"&collection="+that.state.colltn;

     if((that.state.check=='1')&&(that.state.colltn)){
       cf=that.props.s+"&collection="+that.state.colltn+"&delivery="+that.state.check;
     }
      if((that.state.check=='1')&&cost){
       cf=that.props.s+"&delivery="+that.state.check+"&cost1="+c1+"&cost2="+c2;
     }
      if(cost&&(that.state.colltn)){
       cf=that.props.s+"&collection="+that.state.colltn+"&cost1="+c1+"&cost2="+c2;
     }

     if((that.state.check=='1')&&(that.state.colltn)&&cost){
       cf=that.props.s+"&collection="+that.state.colltn+"&delivery="+that.state.check+"&cost1="+c1+"&cost2="+c2;
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
              <Input type="radio" name="radio" id="collection" value={data.collection}  onChange={this.handleFilter.bind(this)}/>{' '}
            {data.collection}
            </Label>
          </FormGroup>
        </FormGroup>)}
        )}
      </div><hr/>
         <h5 className="card-text" style={{paddingLeft:"1px"}}> Cost </h5>
            <Filters1 filter={this.handleParams.bind(this)}/>
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
