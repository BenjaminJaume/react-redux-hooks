import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

import { fetchJoke, setJokeCategory } from "../redux";

const isEmptyObject = (object) => {
  return !(
    object &&
    Object.keys(object).length === 0 &&
    object.constructor === Object
  );
};

function Jokes() {
  // Importing Redux
  const { user: currentUser } = useSelector((state) => state.user);

  const jokeLoading = useSelector((state) => state.joke.jokeLoading);
  const joke = useSelector((state) => state.joke.joke);
  const jokeError = useSelector((state) => state.joke.jokeError);
  const jokeCategory = useSelector((state) => state.joke.jokeCategory);

  const dispatch = useDispatch();

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  const jokesCategory = [
    "Any",
    "Misc",
    "Programming",
    "Dark",
    "Pun",
    "Spooky",
    "Christmas",
  ];

  return (
    <>
      {!currentUser ? (
        <Container className="text-center my-5">
          <Row>
            <Col>
              <p>You need to be authentified to access this feature</p>

              <IndexLinkContainer to="/login" href="/login">
                <Button variant="success">Go to login page</Button>
              </IndexLinkContainer>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container className="my-5">
          <Row>
            <Col>
              <h1 className="text-center text-success">Want to hear a joke?</h1>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <strong>Joke category</strong>
              {jokesCategory.map((category, index) => (
                <Form.Check
                  key={`default-${index}`}
                  type="radio"
                  id={`default-${category}`}
                  label={category}
                  name="jokeCategory"
                  onChange={() => dispatch(setJokeCategory(category))}
                  defaultChecked={jokeCategory === category}
                />
              ))}
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                onClick={() => dispatch(fetchJoke(jokeCategory))}
                className="text-center"
              >
                {jokeLoading ? (
                  <Spinner
                    animation="border"
                    role="status"
                    as="span"
                    aria-hidden="true"
                    className="align-middle me-2"
                    size="sm"
                  >
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                ) : null}
                Search joke
              </Button>
            </Col>
          </Row>
          <Row className="my-5">
            <Col>
              {jokeError ? (
                <Alert variant="danger">
                  A problem occured: {jokeError.message || jokeError}
                </Alert>
              ) : null}
              {isEmptyObject(joke) ? (
                <Alert variant="success">
                  {joke.safe === false ? (
                    <p className="text-danger text-center font-weight-bold">
                      <FontAwesomeIcon
                        className="text-danger me-2"
                        icon={faExclamationTriangle}
                      />{" "}
                      NSFW{" "}
                      <FontAwesomeIcon
                        className="text-danger me-2"
                        icon={faExclamationTriangle}
                      />
                    </p>
                  ) : null}
                  {joke.type === "single" ? (
                    <p className="mb-0">{joke.joke}</p>
                  ) : (
                    <>
                      <p>{joke.setup}</p>
                      <p className="mb-0">{joke.delivery}</p>
                    </>
                  )}
                </Alert>
              ) : null}
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default Jokes;
