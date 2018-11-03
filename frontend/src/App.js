import React, { Component } from 'react';
import './App.css';
import Todos from './containers/Todos';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Welcome from './components/Welcome';
import {connect} from 'react-redux';
import * as actionTypes from './store/actionTypes';
import {Route} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import Pusher from 'pusher-js/react-native';

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher('f2e484518adbbe9fa4d4', {
  cluster: 'eu',
  forceTLS: true
});

var channel = pusher.subscribe('my-channel');
channel.bind('my-event', function(data) {
  alert(data.message);
});

class App extends Component {


  componentDidMount(){
    this.update();
  };

  update(){
    this.apiCall("/get-all-data","GET");
  }

  apiCall = (url,method,body) => {
    let that = this;
    let token = localStorage.getItem("token");
    var type = url.split("/",2);
    type = type.splice(1);
    let fetchBody;
    switch(type[0]){
      case 'get-all-data':
      case "get-data":
      case "delete":
        fetchBody=undefined;
        break;
      case "insert":
        console.log(body);
        let content = body.split(",",1);
        let author = body.split(",")[1];
        fetchBody={"content":content,"author":author};
        break;
      case "signup":
        let mail = body.split(",",1);
        let password = body.split(",")[1];
        fetchBody={"mail":mail,"password":password}
        break;
      case "login":
        let accountmail = body.split(",",1);
        let accountpassword = body.split(",")[1];
        fetchBody={"mail":accountmail,"password":accountpassword}
        break;
      case "protected":
        fetchBody={"name":body};
        break;      
      default:
      console.log("Nix davon");
        break;
    }
    console.log("API-Call with type of "+type+" to "+url+",with method of "+method+" and this body: "+fetchBody);
    return fetch(new Request('https://radiant-fjord-36427.herokuapp.com'+url,{
      method: method,
      headers: new Headers({
        "Content-Type":"application/json",
        "Access-Control-Allow-Methods":"GET, POST, OPTIONS, PUT, PATCH, DELETE",
        "Access-Control-Allow-Origin":"http://localhost:3000",
        "Authorization":"Bearer "+token,
      }),
      body: JSON.stringify(fetchBody)
    }))
    .then(function(res){
      return res.json()
    })
    .then(function(res){
      switch(type[0]){
        case "get-all-data":
          console.log('Ein GET_ALL_DATA');
          that.props.onGiveAllData(res);
          break;
        case "insert":
          that.props.onClearInputField();
          that.update();
          break;
        case "delete":
          that.update();
          break;
        case "signup":
          alert(res.message);
          break;
        case "login":
          alert(res.message);
          localStorage.setItem("token",res.token);
          that.props.onSaveToken(res.token,res.username);
          if(res.status === 200){
            that.update();
          }
          break;
        case "protected":
          alert(res.message);
          console.log(res.data)
          break;
        default:
          console.log("err");
          break;
      }
     
    })  
  };

  changeNameHandler = (e) => {
    this.props.onFillInputField(e.target.value);
  }
  render() {
    return (
      <div className="App">
        <Welcome name={this.props.eml}/>
        <Route path="/anmelden" exact render={(props) => <SignUp {...props} fetch={this.apiCall}/>}/>
        <Route path="/einloggen" exact render={(props) => <SignIn {...props} fetch={this.apiCall}/>}/>
        <Route path="/todos" exact render={(props) => <Todos {...props} fetch={this.apiCall} value={this.props.vae} changeName={this.changeNameHandler} username={this.props.usrn} objs={this.props.objs}/>}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    objs: state.objects,
    vae: state.value,
    eml: state.email,
    pwd: state.password,
    tkn: state.token,
    usrn: state.username,
  }
};

const mapDispatchToProps = (dispatch) => {
  return{
    onGiveAllData: (res) => dispatch({type:actionTypes.GET_ALL_DATA, objects: res }),
    onClearInputField: () => dispatch({type:actionTypes.CLEAR_INPUT_FIELD}),
    onFillInputField: (txt) => dispatch({type:actionTypes.FILL_INPUT_FIELD, txt:txt}),
    onSaveToken: (token,username) => dispatch({type: actionTypes.SET_TOKEN,token:token,username:username}),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
