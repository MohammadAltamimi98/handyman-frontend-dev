import React from 'react';
import { Link } from 'react-router-dom';
function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>Handy-Man online service</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/client">Client</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;