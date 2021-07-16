import React, { Component } from 'react'
// import Header from '../header'
import './home.css';

import SignUp from '../signup';
import SignIn from '../signin';
import Button from 'react-bootstrap/Button'

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showIn: false,
      showUp: false,
    };
  }

  handleClickShowUp = (e) => {
    this.setState({
      showUp: true,
      showIn: false
    });
  };

  handleClickShowIn = (e) => {
    this.setState({
      showIn: true,
      showUp: false
    });
  };

  render() {
    return (
      <div id="main">
        {/* <main className="container"> */}


        {!this.state.showUp && !this.state.showIn
          &&
          <div id="greetings"> <h3>🔨  Welcome to our HandyMan assistance service! 👨‍🔧️ <br />
            <br />
            You can order the best workers online for Residential or Industrial placements at your comfort.</h3><br />
            <h5> - Our services extends from Sewage and sanitary systems fixation to rennovating and Mechanical support.</h5></div>}


        {this.state.showUp && <SignUp />}
        {this.state.showIn && <SignIn />}

        <Button id="btn1"
          variant="primary"
          onClick={this.handleClickShowUp}
          size="lg"
        >
          Sign Up
        </Button>

        <Button id="btn2"
          variant="primary"
          onClick={this.handleClickShowIn}
          size="lg"
        >
          Sign In
        </Button>

        {/* </main> */}
      </div>
    )
  }
}
