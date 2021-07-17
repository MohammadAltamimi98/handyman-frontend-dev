// import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap/';
import { useHistory } from 'react-router-dom';




function Header() {




  const history = useHistory();
  function logOut() {
    localStorage.clear();
    return history.push('/');

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

        <Nav>
          <NavDropdown title="user">
            <NavDropdown.Item onClick={logOut}>Log Out</NavDropdown.Item>
          </NavDropdown>
        </Nav>



      </Navbar>
    </div>
  )

}
export default Header;