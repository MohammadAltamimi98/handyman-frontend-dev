import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      pswd: '',
      redirect: false,
      user: ''
    };
  }


  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };


  handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...this.state,
      created_at: Date.now(),
    };
    const HOST = process.env.REACT_APP_SERVER;
    const loggedInUser = await axios.post(`${HOST}/login`, {}, {
      auth: {
        username: this.state.name,
        password: this.state.pswd
      }
    }).catch(err => {
      alert(("wrong username or password"));
    });
    console.log(loggedInUser.data);
    if (loggedInUser) {
      localStorage.setItem("token", loggedInUser.data.token);
      this.setState({ user: loggedInUser.data.user.admin })
      this.setState({ redirect: true })
    }


    // this.props.socket.emit('createTicket', payload);
  };


  render() {
    if (this.state.user == true) {
      if (this.state.redirect) {
        return <Redirect to="/admin" />
      }

    }
    else {
      if (this.state.redirect) {
        return <Redirect to="/client" />
      }
    }

    return (
      <div>

        <Form id="signin-form" onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail"  >

            <Form.Label>Name </Form.Label>
            <Form.Control type="text" placeholder="Enter Your name" name="name" onChange={this.handleChange} />
            <Form.Text className="text-muted">
              We'll never share your credentials with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="pswd" onChange={this.handleChange} />
          </Form.Group>


          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}
