import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Admin from '../admin';
import Client from '../client';
import Home from '../home';
import io from 'socket.io-client';
import jwt from 'jsonwebtoken';
const SERVER_URL = process.env.REACT_APP_SERVER;
const secret = process.env.SECRET;
// const SERVER_URL =' localhost:5000/';

const verify = () => {
  if (localStorage.getItem("token")) {
    const token = localStorage.getItem("token");
    const validUser = jwt.verify(token, secret);
    return validUser;
  }
  else {
    return null;
  }
}
const socket = io(`${SERVER_URL}/`, { transports: ['websocket'] });
function Main(props) {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <Home {...props} socket={socket} />} />
      <Route path="/admin" render={(props) => <Admin {...props} verify={verify} socket={socket} />} />
      <Route path="/client" render={(props) => <Client {...props} verify={verify} socket={socket} />} />
      <Route>
        <div>404</div>
      </Route>
    </Switch>
  );
}

export default Main;