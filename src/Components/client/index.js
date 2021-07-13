import React from 'react';
import './client.css';

class Client extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      clientName: '',
    };
    console.log('PROPS', this.props.socket);
  }

  // use `componentDidMount` lifescycle method that runs after the component rendered 
  // 1. get the client name 
  // 2.define the state `clientName` 
  // 3.use the socket.on props to connect to the socket.io backent

  componentDidMount() {
    const clientName = prompt("What's your name?");
    this.setState({ clientName });

    this.props.socket.on('connect', () => {

      // when the ticket is claimed by an admin; the client should be alerted.

      this.props.socket.on('claimed', function (payload) {
        alert(`${payload.name} claimed your ticket`);
      });
    });
  }

  // handleChange: updates the values of the inputs simultaneously 
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };


  // on submitting the form 
  // 1. prevent the page from refresh.
  // 2. definr your payload .
  // 3.emit the payload.
  // 4. when the client submits the form all available admins are informed.

  handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...this.state,
      created_at: Date.now(),
    };
    console.log('handle submit payload is = ', payload);
    this.props.socket.emit('createTicket', payload);
  };


  render() {
    return (
      <main className="container">
        <section className="form-card">
          <form id="questions-form" onSubmit={this.handleSubmit}>

            <input
              className="question"
              type="text"
              name="question"
              placeholder="Describe your Problem here... 👨‍🔧️👨‍🔧️"
              required
              onChange={this.handleChange}
            />


            <label className="t1">
              <input
                type="radio"
                name="type"
                value="resedntial"
                required
                onChange={this.handleChange}
              />
              Resedntial
            </label>

            <label className="t2">
              <input
                type="radio"
                name="type"
                value="industrial"
                onChange={this.handleChange}
              />
              Industrial
            </label>

            <label className="ser">
              <input
                type="radio"
                name="service"
                value="electrical"
                required
                onChange={this.handleChange}
              />
              Electrical
            </label>

            <label className="ser">
              <input
                type="radio"
                name="service"
                value="mechanical"
                onChange={this.handleChange}
              />
              Mechanical
            </label>

            <label className="ser">
              <input
                type="radio"
                name="service"
                value="sewage"
                onChange={this.handleChange}
              />
              Sewage
            </label>

            <label className="ser">
              <input
                type="radio"
                name="service"
                value="restoration"
                onChange={this.handleChange}
              />
              Restoration
            </label>

            <label className="ser">
              <input
                type="radio"
                name="service"
                value="others"
                onChange={this.handleChange}
              />
              Others
            </label>

            <button className="question">Request Professional Assistance</button>
          </form>
        </section>
      </main>
    );
  }
}

export default Client;