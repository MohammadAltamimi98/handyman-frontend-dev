import React from 'react';
import Ticket from './ticket';
import jwt from 'jsonwebtoken';
import './admin.css';
import { Redirect } from 'react-router-dom';
class Admin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      adminName: '',
      tickets: [],
      onlineAdmins: [],
      redirect: false
    };
    console.log('PROPS', this.props);
  }


  //  All of the admins  will be notified with a ticket once submitted.
  // component Did mount :
  //1: set the adminName state



  componentDidMount() {

    const token = localStorage.getItem("token");
    if (token) {
      const validUser = jwt.verify(token, "HelloFromMohammedAlramahiTheBest");

      if (validUser.admin) {
        console.log(validUser);


        this.props.socket.on('connect', () => {
          const adminName =
            this.setState({ adminName: validUser.username });
          // when a new admin joins: set state of name to admin name
          this.props.socket.emit('join', { adminName });
          this.props.socket.emit('getAll');


          this.props.socket.on('newTicket', (payload) => {
            this.setState({ tickets: [...this.state.tickets, payload] });
            console.log(this.state.tickets)
          });


          this.props.socket.on('onlineAdmins', (payload) => {
            this.setState({ onlineAdmins: [...this.state.onlineAdmins, payload] });
          });


          this.props.socket.on('offlineAdmins', (payload) => {
            console.log('offlineAdmins payload = ', payload);

            this.setState({
              onlineAdmins: this.state.onlineAdmins.filter((admins) => admins.id !== payload.id),
            });
          });

        });
      }
      else {
        this.setState({ redirect: true })
      }

    }
    else {
      this.setState({ redirect: true })
    }

  }

  handleClaim = (id, socketId) => {
    console.log(socketId);
    this.props.socket.emit('claim', {
      id,
      name: this.state.adminName,
      clientId: socketId,
    });
  };



  render() {
    if (this.state.redirect) {
      return <Redirect
        to="/" />
    }
    return (

      <main className="admin-container">
        <section id="container">
          <h2>Opened Tickets</h2>
          <section id="tickets">
            {this.state.tickets.map((ticket, idx) => {
              return (
                <Ticket {...ticket} handleClaim={this.handleClaim} key={idx} />
              );
            })}
          </section>
        </section>

        <aside id="online-admins">
          <h2>Available Admins</h2>
          {this.state.onlineAdmins.map((admins, id) => (
            <h2 key={id}>{admins.id}{console.log(admins)}</h2>
          ))}
        </aside>
      </main>
    );
  }
}

export default Admin;