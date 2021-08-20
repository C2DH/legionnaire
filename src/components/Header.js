import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { PrimaryRoutes } from '../constants';
import '../styles/components/Header.scss';

const Header = () => {
  return (
    <header>
      <Navbar
        className = "Header"
        fixed     = "top"
        expand    = "md"
        bg        = "light"
      >
        <Navbar.Brand
          as        = {Link}
          to        = "/"
          className = "logo ms-4"
        >
          <img src="/logo.svg" alt="Logo Légionnaire" height="48" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav className="main-menu">

            {PrimaryRoutes.map(route =>
              <Nav.Link
                as        = {NavLink}
                to        = {route.to}
                key       = {route.to}
                className = "menu-item"
              >
                {route.label}
              </Nav.Link>
            )}

          </Nav>
        </Navbar.Collapse>

      </Navbar>
    </header>
  );
}

export default Header;
