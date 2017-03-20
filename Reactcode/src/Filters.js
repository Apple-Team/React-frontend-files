import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Router, Route, hashHistory } from 'react-router';
import Filters1 from './Filters1';
var c1='',c2='',cost,i='',j;
class Filters extends Component {
  constructor() {
    // In a constructor, call `super` first if the className extends another classNameName
    super();
     console.log('jjj');
    this.state = { filter:[],
       data: [],filter_data:[],check:''};
    this.handleFilter=this.handleFilter.bind(this);
    this.handleFilters=this.handleFilters.bind(this);
    this.handleRemove=this.handleRemove.bind(this);
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

  handleTime(){

      var d = new Date(),
      h = (d.getHours()<10?'0':'') + d.getHours(),
      m = (d.getMinutes()<10?'0':'') + d.getMinutes();
      i = h + ':' + m +':00';
     console.log(i);
      this.handleFilters();
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
     this.handleFilters();
}
handleParams1(ot) {
    console.log(ot);
    i=ot;
    this.handleFilters();
}

handleFilters(e){

     var that=this;
     var cf='';
     that.state.check=document.getElementById('delivery').checked;

      if(that.state.check==true){
          that.state.check='1';
            cf+='&delivery=1'
        }
      else
         that.state.check='0';
      console.log(that.state.check);
     console.log(that.state.colltn);

      that.state.filter=[
        {
        key:'&collection=',
        value:that.state.colltn
        },
        {
        key:'&cost1=',
        value:c1
        },
        {
        key:'&cost2=',
        value:c2
        },
        {
          key:'&time=',
          value:i
      }
    ]

  var x=that.state.filter.map(function(item, index){
        if(item.value)
         return item.key+item.value;
      });
      console.log(x);
      for(j=0;j<x.length;j++){
        if(x[j]){
          cf+=x[j];
          console.log(cf);
      }
    }

    /* if(that.state.check=='1'){
        cf=that.props.s+"&delivery="+that.state.check;
      }
     if(cost){
        cf=that.props.s+"&cost1="+c1+"&cost2="+c2;
      }
     if(i){
        cf=that.props.s+"&time="+i;
     }
     if(that.state.colltn){
        cf=that.props.s+"&collection="+that.state.colltn;
    }


     if((that.state.check=='1')&&(that.state.colltn)){
       cf=that.props.s+"&collection="+that.state.colltn+"&delivery="+that.state.check;
     }
     if((that.state.check=='1')&&cost){
      cf=that.props.s+"&delivery="+that.state.check+"&cost1="+c1+"&cost2="+c2;
    }
    if(cost&&(that.state.colltn)){
     cf=that.props.s+"&collection="+that.state.colltn+"&cost1="+c1+"&cost2="+c2;
    }
    if(cost&&i){
      cf=that.props.s+"&cost1="+c1+"&cost2="+c2+"&time="+i;
    }
    if(that.state.check=='1'&&i){
       cf=that.props.s+"&delivery="+that.state.check+"&time="+i;
     }
     if(that.state.colltn&&i){
        cf=that.props.s+"&collection="+that.state.colltn+"&time="+i;
    }


     if((that.state.check=='1')&&(that.state.colltn)&&i){
       cf=that.props.s+"&collection="+that.state.colltn+"&delivery="+that.state.check+"&time="+i;
     }
     if((that.state.check=='1')&&cost&&i){
      cf=that.props.s+"&delivery="+that.state.check+"&cost1="+c1+"&cost2="+c2+"&time="+i;
    }
    if((that.state.check=='1')&&(that.state.colltn)&&cost){
      cf=that.props.s+"&collection="+that.state.colltn+"&delivery="+that.state.check+"&cost1="+c1+"&cost2="+c2;
    }


     if((that.state.check=='1')&&(that.state.colltn)&&cost&&i){
       cf=that.props.s+"&collection="+that.state.colltn+"&delivery="+that.state.check+"&cost1="+c1+"&cost2="+c2+"&time="+i;
     }
 */



    fetch("http://localhost:9000/filter_restaurants?keyword="+that.props.s+cf)
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
  handleRemove(e){

    console.log('Remove');
    document.getElementById('delivery').checked=false;
    document.getElementById('collection').checked=false;
    document.getElementById("otime").value='0';
    document.getElementById("cost").value='0';
    //document.getElementById("collection").checked=false;
    this.setState({
    check: !this.state.check,
      colltn: !this.state.colltn
    });
    i='';
    c1='';
    c2='';
  }

   render() {
      return (
         <div>
            <div className="card"  id="filtersrch" >
          <h4 className="card-subtitle">Refine your Search</h4><i id="ptext"><a onClick={this.handleRemove.bind(this)}>Remove</a></i><hr/>
          <h5 className="card-text" style={{paddingLeft:"1px"}}> Collections </h5>
          <div style={{paddingLeft:"2px"}}>{
          this.state.data.map((data,index)=>{
           return (
          <FormGroup tag="fieldset">
           <FormGroup check>
            <Label check>
              <Input type="radio" name="radio" id="collection" value={data.collection} checked={this.state.colltn === data.collection} onChange={this.handleFilter.bind(this)}/>{' '}
            {data.collection}
            </Label>
          </FormGroup>
        </FormGroup>)}
        )}
      </div><hr/>

            <Filters1 filter={this.handleParams.bind(this)} filter1={this.handleParams1.bind(this)}/><br/>

            <button type="button" className="btn btn-warning btn-sm" onClick={this.handleTime.bind(this)}>Open Now</button>&nbsp;
            <hr/>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" id="delivery" onClick={this.handleFilters.bind(this)}/>{' '}
                Home Delivery
              </Label>
            </FormGroup>

       </div>
         </div>
      );

    }
}

export default Filters;
