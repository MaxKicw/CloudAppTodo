import React, { Component } from 'react';
import InputBox from '../components/InputBox';
import DataObject from '../components/DataObject';

class Todos extends Component {


    render() { 
        return ( 
            <div>
                <InputBox fetch={this.props.fetch.bind(this,"/insert","POST",this.props.value+","+this.props.username)} value={this.props.vae} changeName={this.props.changeName} username={this.props.usrn}/>
                <div className="todo-container">
                    {this.props.objs.map((user,index)=>{
                        return <DataObject content={user.content} key={index} id={user._id} fetch={this.props.fetch}/>
                    })}
                </div>
            </div>
         );
    }
}
 
export default Todos;