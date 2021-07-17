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
      successRedirect: false
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
    const loggedInUser = await axios.post("http://localhost:5000/login", {}, {
      auth: {
        username: this.state.name,
        password: this.state.pswd
      }
    }).catch(err => {
      alert(("wrong username or password"));
    });
    if (loggedInUser) {
      localStorage.setItem("token", loggedInUser.data.token);
      this.setState({ successRedirect: true })
    }


    // this.props.socket.emit('createTicket', payload);
  };


  render() {
    if (this.state.successRedirect) {
      return <Redirect exact to="/admin" />
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
