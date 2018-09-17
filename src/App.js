import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import "bootstrap/dist/js/bootstrap.min.js";
var firebase=require("firebase");
var config = {
    apiKey: "AIzaSyAi2J7E2P1j1MMBiOTsN3jNAFq_4wlqBgw",
    authDomain: "login-firebase-e0dec.firebaseapp.com",
    databaseURL: "https://login-firebase-e0dec.firebaseio.com",
    projectId: "login-firebase-e0dec",
    storageBucket: "login-firebase-e0dec.appspot.com",
    messagingSenderId: "227632912077"
  };
  firebase.initializeApp(config);
class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      err:"" 
    };
    this.click=this.click.bind(this);
    this.signUp=this.signUp.bind(this);
    this.google=this.google.bind(this);
  }
  click(even)
  {
    const email=this.refs.email.value;
    const password=this.refs.password.value;
    console.log(email,password);
    const auth=firebase.auth();
    const promise=auth.signInWithEmailAndPassword(email,password);
    
    // TODO:handle the login
    
    promise.catch(e=>{
      var err=e.message;
      this.setState({
        err:err,
      })
    });
  }
  google()
  {
    console.log("gajjar darshit i am google");
    var provider=new firebase.auth.GoogleAuthProvider();
    var promise=firebase.auth().signInWithRedirect(provider);
    promise.then(result=>{
      var user=result.user;
      console.log(user);
      firebase.database().ref("user/"+user.uid).set({
        email:user.email,
      });
    })
    promise.catch(err=>{
      var errorcode=err.code;
      console.log(errorcode);
      var errmessage=err.message;
      this.setState({
        err:errmessage,
      })
    })
  }
  signUp()
  {
    const email=this.refs.email.value;
    const password=this.refs.password.value;
    console.log(email,password);
    const auth=firebase.auth();
    const promise=auth.createUserWithEmailAndPassword(email,password);
    promise.then((user)=>{
      var err="gajjar darshit hasmukhbhai"+email;
      console.log(err);
      firebase.database().ref('user/').set({
        email:email,
        password:password,
      });
      console.log(user);
      this.setState({
        err:err,
      });
    });
    promise
    .catch(err=>{
      var error=err.message;
      console.log(error);
      console.log("darshit gajjar");
      this.setState(({
        err:error,
      }))
    })
  }
  
  render() {
    return (
      <div>
          <h1 class="text text-danger text-center text-capitalize">i am firebase auntahtication</h1>
          <input type="email" id="name" ref="email" className="switch "/>
          <br/>
          <br/>
          <input type="password" id="password" ref="password" className="switc"/>
          <button type="button" onClick={this.click} className="btn  mnb">click</button>
          <p class="text text-danger text-left">{this.state.err}</p>
          <button type="button"  className="btn btn-danger mbn" onClick={this.signUp}>signup</button>
          <div class="col-md-4">
            <button onClick={this.google} type="button" class="button btn btn-block d-block m-auto"><p class="text text-white">google</p></button>
          </div>
      </div>
    );
  }
}

export default App;