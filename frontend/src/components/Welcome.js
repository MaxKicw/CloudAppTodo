import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import './Welcome.css';

class Welcome extends Component {
    state = {
        value:'',
    }
    render() { 
        return(
        <div className="Menubar">
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