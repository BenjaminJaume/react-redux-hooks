import React from "react";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUserShield } from "@fortawesome/free-solid-svg-icons";

function displayRole(role, index) {
  // Slice the ROLE_
  // And Title case for estetic
  const content = role.slice(5, role.length).replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

  switch (content) {
    case "Moderator":
      return (
        <ListGroup.Item key={index}>
          <FontAwesomeIcon className="text-warning me-2" icon={faUserShield} />
          <span>{content}</span>
        </ListGroup.Item>
      );
    case "Admin":
      return (
        <ListGroup.Item key={index}>
          <FontAwesomeIcon className="text-success me-2" icon={faKey} />
          <span>{content}</span>
        </ListGroup.Item>
      );

    default:
      break;
  }
}

const DisplayAuthorities = () => {
  const { user: currentUser } = useSelector((state) => state.user);

  return (
    <>{currentUser.roles.map((role, index) => displayRole(role, index))}</>
  );
};

export default DisplayAuthorities;
