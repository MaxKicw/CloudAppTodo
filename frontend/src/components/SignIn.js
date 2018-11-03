import React, { Component } from 'react';
import './SignUp.css';

class SignIn extends Component{

    state = {
        email:'',
        password:'',
    }

    updateEmail(e) {
        this.setState({email:e.target.value});
    }

    updatePassword(e) {
        this.setState({password:e.target.value});
    }
    
    render(){
        let emailPassword = this.state.email +","+this.state.password;
        return(
            <div>
                <div className="SignObject">
                    <p>Login</p>
                    <input type="E-Mail" value={this.state.email} onChange={this.updateEmail.bind(this)}/>
                    <input type="Passwort"value={this.state.password} onChange={this.updatePassword.bind(this)}/>
                    <div className="Submit" onClick={this.props.fetch.bind(this,"/login","POST",emailPassword)}><p>Absenden</p></div>
                </div>
            </div>
        )
    }
}

export default SignIn;