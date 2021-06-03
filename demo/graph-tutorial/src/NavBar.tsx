// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// <NavBarSnippet>
import { NavLink as RouterNavLink } from 'react-router-dom';
import {
  Container,
  Dropdown,
  Navbar,
  Nav,
  NavDropdown,
  NavItem
} from 'react-bootstrap';
import { AppUser, useAppContext } from './AppContext';

function AuthenticatedNav() {
  const app = useAppContext();

  // Only show calendar nav item if logged in
  if (app.user) {
    return (
      <NavItem>
        <RouterNavLink to="/calendar" className="nav-link" exact>Calendar</RouterNavLink>
      </NavItem>
    );
  }

  return null;
}

interface UserAvatarProps {
  user: AppUser
};

function UserAvatar(props: UserAvatarProps) {
  // If a user avatar is available, return an img tag with the pic
  return <img
      src={props.user.avatar || '/images/no-profile-photo.png'} alt="user"
      className="rounded-circle align-self-center mr-2"
      style={{ width: '32px' }}></img>;
}

function SignInOrOut() {
  const app = useAppContext();
  // If authenticated, return a dropdown with the user's info and a
  // sign out button
  if (app.user) {
    return (
      <NavDropdown title={<UserAvatar user={app.user} />} id="user-dropdown">
          <h5 className="dropdown-item-text mb-0">{app.user.displayName}</h5>
          <p className="dropdown-item-text text-muted mb-0">{app.user.email}</p>
          <Dropdown.Divider />
          <Dropdown.Item onClick={app.signOut!}>Sign Out</Dropdown.Item>
      </NavDropdown>
    );
  }

  // Not authenticated, return a sign in link
  return (
    <NavItem>
      <Nav.Link
        onClick={app.signIn!}>Sign In</Nav.Link>
    </NavItem>
  );
}

export default function NavBar() {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="md" fixed="top">
        <Container>
          <Navbar.Brand href="/">React Graph Tutorial</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto" navbar>
              <NavItem>
                <RouterNavLink to="/" className="nav-link" exact>Home</RouterNavLink>
              </NavItem>
              <AuthenticatedNav />
            </Nav>
            <Nav className="justify-content-end align-items-center" navbar>
              <Nav.Link href="https://developer.microsoft.com/graph/docs/concepts/overview" target="_blank">
                Docs
              </Nav.Link>
              <SignInOrOut />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
// </NavBarSnippet>
