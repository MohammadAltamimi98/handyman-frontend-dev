import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      pswd: '',
      address: '',
      admin: false
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
    if (e.target.control === "admin") {
      this.setState({ admin: true })
    }
    else {
      this.setState({ admin: false })
    }
    const userDetails = {
      username: this.state.name,
      password: this.state.pswd,
      admin: this.state.admin
    }
    const HOST = process.env.REACT_APP_SERVER;
    const newUser = await axios.post(`${HOST}/signup`, userDetails);
    console.log(newUser.data);
    //localStorage.setItem();
    console.log('handle submit payload is = ', payload);
    // this.props.socket.emit('createTicket', payload);
  };


  render() {
    return (
      <div>

        <Form id="signup-form" onSubmit={this.handleSubmit}>

          <Form.Group className="mb-3" controlId="formBasicEmail" >
            <Form.Label>Name </Form.Label>
            <Form.Control type="text" placeholder="Enter Your name" name="name" onChange={this.handleChange} />
            <Form.Text className="text-muted">
              We'll never share your credentials with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword" >
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="pswd" onChange={this.handleChange} />
          </Form.Group>


          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder=" 123 Main Street, New York, NY 10030." name="address" onChange={this.handleChange} autoComplete="new-password" />
          </Form.Group>
          <br />


          <Form.Group className="mb-3" controlId="formBasicCheckbox-1" onChange={this.handleChange} >
            <Form.Check type="radio" label="Admin" name="control" value="admin" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox-2" onChange={this.handleChange} checked >
            <Form.Check type="radio" label="Client" name="control" value="client" />
          </Form.Group>


          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}
