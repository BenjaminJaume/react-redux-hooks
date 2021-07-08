import React, { useState, useEffect } from "react";
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
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    } else {
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
    }
  }, [currentUser]);

  const logOut = () => {
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    dispatch(logout());
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Collapse id="navigation-bar">
        <Nav className="w-100 justify-content-around align-items-baseline">
          <IndexLinkContainer to="/" href="/">
            <Nav.Link className="text-center">
              <FontAwesomeIcon
                className="text-primary mr-2"
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
                    className="text-danger mr-2"
                    icon={faTheaterMasks}
                  />
                  Jokes
                </Nav.Link>
              </IndexLinkContainer>

              <IndexLinkContainer to="/my-favorites" href="/my-favorites">
                <Nav.Link className="text-center">
                  <FontAwesomeIcon
                    className="text-warning mr-2"
                    icon={faStar}
                  />
                  My Favorite Words
                </Nav.Link>
              </IndexLinkContainer>
            </>
          )}

          {showModeratorBoard && !showAdminBoard && (
            <IndexLinkContainer to="/mod" href="/mod">
              <Nav.Link className="text-center">
                <FontAwesomeIcon
                  className="text-success mr-2"
                  icon={faUserShield}
                />
                Moderator
              </Nav.Link>
            </IndexLinkContainer>
          )}

          {showModeratorBoard && showAdminBoard && (
            <NavDropdown title="Settings" id="dropdownRoles">
              <IndexLinkContainer to="/mod" href="/mod">
                <NavDropdown.Item>Moderator</NavDropdown.Item>
              </IndexLinkContainer>

              <IndexLinkContainer to="/admin" href="/admin">
                <NavDropdown.Item>Admin</NavDropdown.Item>
              </IndexLinkContainer>
            </NavDropdown>
          )}

          {currentUser ? (
            <Navbar className="navbar-nav ml-auto">
              <IndexLinkContainer to="/profile" href="/profile">
                <Nav.Link className="text-center">
                  <FontAwesomeIcon className="text-light mr-2" icon={faUser} />
                  {currentUser.username}
                </Nav.Link>
              </IndexLinkContainer>

              <IndexLinkContainer to="/" href="/">
                <Button onClick={logOut} variant="danger" size="sm">
                  <FontAwesomeIcon
                    className="text-light mr-2"
                    icon={faPowerOff}
                  />
                  Logout
                </Button>
              </IndexLinkContainer>
            </Navbar>
          ) : (
            <Navbar className="navbar-nav ml-auto">
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
