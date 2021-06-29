import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { PrimaryRoutes } from '../constants';
import '../styles/components/Header.scss';

const Header = () => {
  return (
    <Navbar
      className = "Header"
      sticky    = "top"
      expand    = "md"
    >
      <Navbar.Brand
        as        = {Link}
        to        = "/"
        className = "mr-auto"
      >
        LÉGIONNAIRE
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <Nav>

          {PrimaryRoutes.map(route =>
            <Nav.Link
              as  = {NavLink}
              to  = {route.to}
              key = {route.to}
              activeClassName = "active"
            >
              {route.label}
            </Nav.Link>
          )}

        </Nav>
      </Navbar.Collapse>

    </Navbar>
  );
}

export default Header;
