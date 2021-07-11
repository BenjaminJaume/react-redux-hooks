import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";

// import UserService from "../services/user.service";

const Moderator = () => {
  const { isLoggedIn, user: currentUser } = useSelector((state) => state.user);

  // Get data from the server for the Moderator Board
  // const [content, setContent] = useState("");
  // useEffect(() => {
  //   UserService.getModeratorBoard().then(
  //     (response) => {
  //       setContent(response.data);
  //     },
  //     (error) => {
  //       const _content =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString();

  //       setContent(_content);
  //     }
  //   );
  // }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  if (currentUser.isModo || currentUser.isAdmin) {
    return <Container>Modo content</Container>;
  }

  return <Redirect to="/" />;
};

export default Moderator;
