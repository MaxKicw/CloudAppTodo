import React, { Component } from 'react';
import './InputBox.css';

class InputBox extends Component{
    
    render(){
        return(
            <div>
                <div className="SignObject">
                    <p>Gebe hier eine neues Todo ein!</p>
                    <input type="text" value={this.props.value} onChange={this.props.changeName.bind(this)}/>
                    <div className="Submit" onClick={this.props.fetch}><p>Hinzufügen</p></div>
                </div>
            </div>
        )
    }
}

export default InputBox