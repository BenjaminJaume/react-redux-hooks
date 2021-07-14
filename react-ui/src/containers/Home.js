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
  addWord,
  fetchWordDefinition,
  changeWord,
  changeSelectedLanguage,
  getAllUserWords,
  removeWord,
  setShowToast,
} from "../redux";

const Home = () => {
  const { user: currentUser } = useSelector((state) => state.user);

  const { languages, languagesAPI, countryFlags, selectedLanguage } =
    useSelector((state) => state.word);

  const { loading, word, data, error } = useSelector((state) => state.word);

  const { loadingAddWord, successAddWord, errorAddWord } = useSelector(
    (state) => state.word
  );

  const { loadingRemoveWord, successRemoveWord, errorRemoveWord } = useSelector(
    (state) => state.word
  );

  const dataAllWords = useSelector((state) => state.word.dataAllWords);

  const showToast = useSelector((state) => state.word.showToast);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      dispatch(getAllUserWords(currentUser.id));
    }
  }, []);

  const displayButton = (meaning, definition) => {
    let result = dataAllWords.find(
      (word) => word.Word.definition === definition.definition
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
            onClick={() => dispatch(removeWord(result.WordId, currentUser.id))}
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
                addWord(
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
                                    ? displayButton(meaning, definition)
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
