import React from 'react';
import { Link, useHistory } from 'react-router-dom';


function Header() {
  const history = useHistory();
  function logOut() {
    localStorage.clear();
    return history.push('/');

  }
  return (
    <header>
      <nav>
        <ul>
          <li>HANDYMAN</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li><li>
            <Link to="/client">Client</Link>
          </li>
          <li>
            <Link onClick={logOut}>Logout</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;