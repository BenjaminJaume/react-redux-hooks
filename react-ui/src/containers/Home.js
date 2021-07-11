import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  FormControl,
  InputGroup,
  Row,
  Col,
  Form,
  Spinner,
  Button,
  Alert,
  OverlayTrigger,
  Tooltip,
  Toast,
} from "react-bootstrap";
import ReactCountryFlag from "react-country-flag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";

import {
  addFavoriteWord,
  fetchWordDefinition,
  changeWord,
  changeSelectedLanguage,
  getAllUserFavoriteWords,
  removeFavoriteWord,
  setShowToast,
} from "../redux";

const Home = () => {
  const { user: currentUser } = useSelector((state) => state.user);

  const languages = useSelector((state) => state.wordDefinition.languages);
  const languagesAPI = useSelector(
    (state) => state.wordDefinition.languagesAPI
  );
  const countryFlags = useSelector(
    (state) => state.wordDefinition.countryFlags
  );

  const loading = useSelector((state) => state.wordDefinition.loading);
  const selectedLanguage = useSelector(
    (state) => state.wordDefinition.selectedLanguage
  );
  const word = useSelector((state) => state.wordDefinition.word);
  const data = useSelector((state) => state.wordDefinition.data);
  const error = useSelector((state) => state.wordDefinition.error);

  const loadingAddWord = useSelector(
    (state) => state.wordDefinition.loadingAddWord
  );
  const successAddWord = useSelector(
    (state) => state.wordDefinition.successAddWord
  );
  const errorAddWord = useSelector(
    (state) => state.wordDefinition.errorAddWord
  );

  const loadingRemoveWord = useSelector(
    (state) => state.wordDefinition.loadingRemoveWord
  );
  const successRemoveWord = useSelector(
    (state) => state.wordDefinition.successRemoveWord
  );
  const errorRemoveWord = useSelector(
    (state) => state.wordDefinition.errorRemoveWord
  );

  const dataAllFavoriteWords = useSelector(
    (state) => state.wordDefinition.dataAllFavoriteWords
  );

  const showToast = useSelector((state) => state.wordDefinition.showToast);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      dispatch(getAllUserFavoriteWords(currentUser.id));
    }
  }, []);

  const displayButtonFavorites = (meaning, definition) => {
    let result = dataAllFavoriteWords.find(
      (word) => word.FavoriteWord.definition === definition.definition
    );

    if (
      currentUser &&
      (result &&
        Object.keys(result).length === 0 &&
        result.constructor === Object) === false
    ) {
      return (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Remove from favorite</Tooltip>}
        >
          <Button
            variant="white"
            onClick={() =>
              dispatch(
                removeFavoriteWord(result.FavoriteWordId, currentUser.id)
              )
            }
          >
            <FontAwesomeIcon className="text-warning" icon={faStarSolid} />
          </Button>
        </OverlayTrigger>
      );
    } else {
      return (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Add to favorite</Tooltip>}
        >
          <Button
            variant="white"
            onClick={() =>
              dispatch(
                addFavoriteWord(
                  word,
                  meaning.partOfSpeech,
                  definition,
                  selectedLanguage,
                  currentUser.id
                )
              )
            }
          >
            <FontAwesomeIcon className="text-warning" icon={faStarRegular} />
          </Button>
        </OverlayTrigger>
      );
    }
  };

  return (
    <>
      <Container className="my-5">
        <Row>
          <Col>
            <h1 className="text-center text-success">Find a word definition</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={6} className="text-center mx-auto">
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Type a word here"
                aria-label="Type a word here"
                type="text"
                onChange={(event) => {
                  dispatch(changeWord(event.target.value));
                }}
                required
                id="wordField"
                style={{ textAlign: "center" }}
                defaultValue={word}
              />
              <>
                {!word || !selectedLanguage ? (
                  <Button variant="success" disabled>
                    Search word
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    onClick={() =>
                      dispatch(fetchWordDefinition(selectedLanguage, word))
                    }
                  >
                    {loading ? (
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
                    ) : null}{" "}
                    Search word
                  </Button>
                )}
              </>
            </InputGroup>
          </Col>
        </Row>
        {/* Language form */}
        <Row>
          <Col>
            <fieldset>
              <Form.Group as={Row}>
                <Form.Label as="language" column sm={2}>
                  Language
                </Form.Label>
                <Col sm={10}>
                  {languages.map((language, index) => (
                    <Form.Check
                      key={languagesAPI[index]}
                      type="radio"
                      id={`radioButton-${languagesAPI[index]}`}
                      name="radioButtonLangugages"
                      value={languagesAPI[index]}
                      required
                      disabled={!currentUser && !(index === 0)}
                      defaultChecked={selectedLanguage === languagesAPI[index]}
                      onChange={() =>
                        dispatch(changeSelectedLanguage(languagesAPI[index]))
                      }
                      label={
                        <>
                          <ReactCountryFlag
                            countryCode={countryFlags[index]}
                            svg
                            className="me-2"
                          />
                          {language}
                        </>
                      }
                    />
                  ))}
                </Col>
              </Form.Group>
            </fieldset>
          </Col>
        </Row>
        <Row>
          <Col>
            {!error ? (
              <>
                <hr className="w-50" />
                {data.map((d, index) => (
                  <div key={index}>
                    <ul>
                      {d.meanings.map((meaning, index) => (
                        <li key={index}>
                          Part of speech:{" "}
                          <strong className="text-primary">
                            {meaning.partOfSpeech}
                          </strong>
                          <ul style={{ listStyle: "none" }}>
                            {meaning.definitions.map((definition, index) => (
                              <li key={index}>
                                <>
                                  {currentUser
                                    ? displayButtonFavorites(
                                        meaning,
                                        definition
                                      )
                                    : null}
                                  <u className="text-success">
                                    Definition {index + 1}:
                                  </u>{" "}
                                  {definition.definition}
                                  {definition.example ? (
                                    <>
                                      {" "}
                                      <u className="text-danger">
                                        Example:
                                      </u>{" "}
                                      <cite>"{definition.example}"</cite>
                                    </>
                                  ) : null}
                                </>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </>
            ) : (
              <>
                <hr className="w-50" />

                {error && (
                  <Form.Group className="form-group">
                    <Alert variant="danger">
                      Sorry, we couldn't find the word
                    </Alert>
                  </Form.Group>
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>

      {loadingAddWord ? (
        <Toast
          onClose={() => dispatch(setShowToast(false))}
          show={showToast}
          delay={5000}
          autohide
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
        >
          <Toast.Header>
            <strong className="me-auto">Loading</strong>
          </Toast.Header>
          <Toast.Body>
            Your word is being added to your list of favorite word's definition
          </Toast.Body>
        </Toast>
      ) : null}

      {loadingRemoveWord ? (
        <Toast
          onClose={() => dispatch(setShowToast(false))}
          show={showToast}
          autohide
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
        >
          <Toast.Header>
            <strong className="me-auto">Loading</strong>
          </Toast.Header>
          <Toast.Body>
            Your word is being removed from your list of favorite word's
            definition
          </Toast.Body>
        </Toast>
      ) : null}

      {errorAddWord ? (
        <Toast
          onClose={() => dispatch(setShowToast(false))}
          show={showToast}
          delay={5000}
          autohide
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
        >
          <Toast.Header>
            <strong className="text-danger mx-auto">An error occured</strong>
          </Toast.Header>
          <Toast.Body>
            Sorry, we could't had this definition to your list
          </Toast.Body>
        </Toast>
      ) : successAddWord ? (
        <Toast
          onClose={() => dispatch(setShowToast(false))}
          show={showToast}
          delay={5000}
          autohide
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
        >
          <Toast.Header>
            <strong className="text-success mx-auto">Word added</strong>
          </Toast.Header>
          <Toast.Body>This definition has been added to your list</Toast.Body>
        </Toast>
      ) : null}

      {errorRemoveWord ? (
        <Toast
          onClose={() => dispatch(setShowToast(false))}
          show={showToast}
          delay={5000}
          autohide
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
        >
          <Toast.Header>
            <strong className="text-danger mx-auto">An error occured</strong>
          </Toast.Header>
          <Toast.Body>
            Sorry, we could't remove this definition from your list
          </Toast.Body>
        </Toast>
      ) : successRemoveWord ? (
        <Toast
          onClose={() => dispatch(setShowToast(false))}
          show={showToast}
          delay={5000}
          autohide
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
        >
          <Toast.Header>
            <strong className="text-success mx-auto">Word removed</strong>
          </Toast.Header>
          <Toast.Body>
            This definition has been removed from your list
          </Toast.Body>
        </Toast>
      ) : null}
    </>
  );
};

export default Home;
