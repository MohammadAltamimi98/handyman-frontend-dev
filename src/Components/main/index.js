import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Admin from '../admin';
import Client from '../client';
import Home from '../home';
import io from 'socket.io-client';


const SERVER_URL = process.env.REACT_APP_SERVER;

const socket = io(`${SERVER_URL}`, { transports: ['websocket'] });
function Main(props) {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <Home {...props} socket={socket} />} />
      <Route exact path="/admin" render={(props) => <Admin {...props} socket={socket} />} />
      <Route exact path="/client" render={(props) => <Client {...props} socket={socket} />} />
      <Route>
        <div>404</div>
      </Route>
    </Switch>
  );
}

export default Main;