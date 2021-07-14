import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpellCheck,
  faTheaterMasks,
  faStar,
  faUser,
  faPowerOff,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";

import { logout } from "../redux";

function NavigationBar() {
  const { user: currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Navbar bg="dark" variant="dark" className="px-1 px-sm-2 px-md-3 px-lg-5">
      <Navbar.Collapse id="navigation-bar">
        <Nav className="w-100 justify-content-around align-items-baseline">
          <IndexLinkContainer to="/" href="/">
            <Nav.Link className="text-center">
              <FontAwesomeIcon
                className="text-primary me-2"
                icon={faSpellCheck}
              />
              Home
            </Nav.Link>
          </IndexLinkContainer>

          {currentUser && (
            <>
              <IndexLinkContainer to="/jokes" href="/jokes">
                <Nav.Link className="text-center">
                  <FontAwesomeIcon
                    className="text-danger me-2"
                    icon={faTheaterMasks}
                  />
                  Jokes
                </Nav.Link>
              </IndexLinkContainer>

              <IndexLinkContainer to="/my-words" href="/my-words">
                <Nav.Link className="text-center">
                  <FontAwesomeIcon
                    className="text-warning me-2"
                    icon={faStar}
                  />
                  My words
                </Nav.Link>
              </IndexLinkContainer>
            </>
          )}

          {currentUser && currentUser.isModo && !currentUser.isAdmin && (
            <IndexLinkContainer to="/modo" href="/modo">
              <Nav.Link className="text-center">
                <FontAwesomeIcon
                  className="text-success me-2"
                  icon={faUserShield}
                />
                Modo
              </Nav.Link>
            </IndexLinkContainer>
          )}

          {currentUser && currentUser.isModo && currentUser.isAdmin && (
            <NavDropdown title="Settings" id="dropdownRoles">
              <IndexLinkContainer to="/modo" href="/modo">
                <NavDropdown.Item>Modo</NavDropdown.Item>
              </IndexLinkContainer>

              <IndexLinkContainer to="/admin" href="/admin">
                <NavDropdown.Item>Admin</NavDropdown.Item>
              </IndexLinkContainer>
            </NavDropdown>
          )}

          {currentUser ? (
            <Navbar className="navbar-nav ms-auto">
              <IndexLinkContainer to="/profile" href="/profile">
                <Nav.Link className="text-center">
                  <FontAwesomeIcon className="text-light me-2" icon={faUser} />
                  {currentUser.username}
                </Nav.Link>
              </IndexLinkContainer>

              <IndexLinkContainer to="/" href="/">
                <Button onClick={logOut} variant="danger" size="sm">
                  <FontAwesomeIcon
                    className="text-light me-2"
                    icon={faPowerOff}
                  />
                  Logout
                </Button>
              </IndexLinkContainer>
            </Navbar>
          ) : (
            <Navbar className="navbar-nav ms-auto">
              <IndexLinkContainer to="/login" href="/login">
                <Nav.Link className="text-center">Login</Nav.Link>
              </IndexLinkContainer>
              <IndexLinkContainer to="/signup" href="/signup">
                <Nav.Link className="text-center">Sign Up</Nav.Link>
              </IndexLinkContainer>
            </Navbar>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
