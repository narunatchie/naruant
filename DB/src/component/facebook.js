import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import './style.css' ;
import {useEffect} from 'react';
localStorage.setItem('key', localStorage.getItem('key'));

export default class Facebook extends Component {
  state = {
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    picture: ""
  };

  handleReset(){
	localStorage.setItem('key', 0);
	console.log("Hello");
	}

  responseFacebook = response => {
    this.props.setEmaildata(response.email)
    this.setState({
      isLoggedIn: localStorage.getItem('key'),
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url,
    });
};

  componentClicked = ( ) => {
    localStorage.setItem('key',1);
  }

  componentDidMount() {
    console.log("qqqqqqqqqqqqqqqqqqqqq");
    console.log();
  }
    
  render() {
	let fbContent ;
	if(this.state.isLoggedIn) {
	fbContent = (
        <div>
          <img src={this.state.picture} alt={this.state.name} />
          <h2>Welcome {this.state.name}</h2>
          Email: {this.state.email}
	<div className = "btn-group btn-group-lg"></div><br/><br/>
	<button type = "button" className="btn btn-danger" onClick={this.handleReset}>Logout</button>
        </div>
      );

    } else {
      fbContent = (
        <FacebookLogin
          appId="1092861388124254"
          autoLoad={Number(localStorage.getItem('key'))}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
        />
      );
    }
    return <div>{fbContent}</div>;
  }
}