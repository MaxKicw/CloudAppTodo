
import React, { Component } from 'react';
import './DataObject.css';

class DataObject extends Component{
    state = {

    }
    
    render(){
        return(
            <div className="DataObject" id={this.props.id}  onClick={this.props.fetch.bind(this,"/delete/"+this.props.id,"GET")}>
                <p>{this.props.content}</p>
            </div>
        )
    }
}

export default DataObject