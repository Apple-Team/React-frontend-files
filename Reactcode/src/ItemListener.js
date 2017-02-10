import React from 'react';
 
export default class ItemLister extends React.Component {
    constructor() {
        super();
        this.state = { items: [] };
    }
    
    componentDidMount() {
        fetch(`http://localhost:8088/api/this/is/an/api/call`) 
            .then(result=> {
                this.setState({items:result.json()});
            });
    }
    
    render() {        
        return(
            <div>
                <div>Items:</div>
                { this.state.items.map(item=> { return <div>{http://item.name}</div>}) }          
            </div>  
        );
    }
}