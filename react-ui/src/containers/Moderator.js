import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Accordion,
  InputGroup,
  FormControl,
  Button,
  Alert,
} from "react-bootstrap";
import { getUsersList } from "../redux";
import dateformat from "dateformat";

function formatDate(date) {
  return dateformat(date, "dd/mm/yyyy");
}
const Moderator = () => {
  const { isLoggedIn, user: currentUser } = useSelector((state) => state.user);

  const loadingUsersList = useSelector(
    (state) => state.manage.loadingUsersList
  );
  const usersListData = useSelector((state) => state.manage.usersListData);
  const usersListError = useSelector((state) => state.manage.usersListError);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      dispatch(getUsersList());
    }
  }, []);

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
    return (
      <Container className="my-5">
        <Row>
          <Col>
            <h1 className="mb-5">List of users</h1>
            {loadingUsersList ? (
              <div>Loading</div>
            ) : (
              <Accordion>
                {usersListData.map((user, index) => (
                  <Accordion.Item eventKey={index} key={index}>
                    <Accordion.Header>{user.username}</Accordion.Header>
                    <Accordion.Body>
                      <InputGroup className="mb-3">
                        <InputGroup.Text className="bg-light">
                          ID
                        </InputGroup.Text>
                        <FormControl defaultValue={user.id} readOnly />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroup.Text className="bg-light">
                          Since
                        </InputGroup.Text>
                        <FormControl
                          defaultValue={formatDate(user.createdAt)}
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroup.Text className="bg-light">
                          Email
                        </InputGroup.Text>
                        <FormControl defaultValue={user.email} />
                        <Button variant="success">Edit</Button>
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroup.Text className="bg-light">
                          Role
                        </InputGroup.Text>
                        <FormControl defaultValue="Coming soon" readOnly />
                        <Button variant="success">Edit</Button>
                      </InputGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            )}
            {usersListError ? (
              <Alert variant="danger">Couldn't load the users</Alert>
            ) : null}
          </Col>
        </Row>
      </Container>
    );
  }

  return <Redirect to="/" />;
};

export default Moderator;
