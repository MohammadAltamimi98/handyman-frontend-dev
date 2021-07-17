// import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap/';
import { Link, useHistory } from 'react-router-dom';



function Header() {

  const history = useHistory();
  function logOut() {
    localStorage.clear();
    history.push('/');

  }

  return (
    <div>
      <Navbar bg="primary" variant="dark">

        <Navbar.Brand href="#home">HandyMan</Navbar.Brand>

        <Nav className="me-auto nav_bar_wrapper">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/client">Client</Nav.Link>
          <Nav.Link href="/admin">Admin</Nav.Link>
        </Nav>
        {localStorage.getItem('token') ?
          <Nav>
            <NavDropdown title="user name">
              <NavDropdown.Item onClick={logOut}>Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav> : null
        }


      </Navbar>
    </div>
  )

}
export default Header;