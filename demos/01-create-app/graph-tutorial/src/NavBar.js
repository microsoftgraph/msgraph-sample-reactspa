import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import '@fortawesome/fontawesome-free/css/all.css';
import './NavBar.css';

function AuthNavItem(props) {
  if (props.isAuthenticated) {
    return (
      <UncontrolledDropdown>
        <DropdownToggle nav caret>
          <i class="far fa-user-circle fa-lg rounded-circle align-self-center mr-2" style={{width: '32px;'}}></i>
        </DropdownToggle>
        <DropdownMenu right>
          <h5 class="dropdown-item-text mb-0">Bob Jones</h5>
          <p class="dropdown-item-text text-muted mb-0">bob@jones.com</p>
          <DropdownItem divider />
          <DropdownItem onClick={props.authButtonMethod}>Sign Out</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>

    );
  }

  return (
    <NavItem>
      <NavLink onClick={props.authButtonMethod}>Sign In</NavLink>
    </NavItem>
  );
}

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };

    this.isAuthenticated = props.isAuthenticated;
    this.authButtonMethod = props.authButtonMethod;
    this.user = props.user;
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md" fixed="top">
          <Container>
            <NavbarBrand href="/">React Graph Tutorial</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <RouterNavLink to="/" className="nav-link" activeClassName="active">Home</RouterNavLink>
                </NavItem>
                <NavItem>
                  <RouterNavLink to="/calendar" className="nav-link" activeClassName="active">Calendar</RouterNavLink>
                </NavItem>
              </Nav>
              <Nav className="justify-content-end" navbar>
                <NavItem>
                  <NavLink href="https://developer.microsoft.com/graph/docs/concepts/overview" target="_blank">
                    <i class="fas fa-external-link-alt mr-1"></i>
                    Docs
                  </NavLink>
                </NavItem>
                <AuthNavItem isAuthenticated={this.isAuthenticated} authButtonMethod={this.authButtonMethod}/>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}