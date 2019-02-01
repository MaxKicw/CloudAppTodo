import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import './Welcome.css';

class Welcome extends Component {
    state = {
        value:'',
    }

    putWelcomeText = () => {
        if(this.props.name !== undefined){
            return(<p>Welcome {this.props.name}!</p>)
        }
    };
    render() { 
        return(
        <div className="Menubar">
            {this.putWelcomeText()}
            <ul>
                <li><NavLink to="/anmelden">Anmelden</NavLink></li>
                <li><NavLink to="/einloggen">Einloggen</NavLink></li>
                <li><NavLink to="/todos">Todos</NavLink></li>
            </ul>
        </div>
        );
    }
}
 
export default withRouter(Welcome);