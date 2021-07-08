import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllUserFavoriteWords } from "../redux";
import {
  Container,
  Row,
  Col,
  // ButtonGroup,
  Button,
  // ButtonToolbar,
  // InputGroup,
  // FormControl,
} from "react-bootstrap";
import ReactCountryFlag from "react-country-flag";
import { removeFavoriteWord } from "../redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const UserFavoriteWords = () => {
  const loadingAllFavoriteWords = useSelector(
    (state) => state.wordDefinition.loadingAllFavoriteWords
  );
  const dataAllFavoriteWords = useSelector(
    (state) => state.wordDefinition.dataAllFavoriteWords
  );
  const errorGetAllFavoriteWords = useSelector(
    (state) => state.wordDefinition.errorGetAllFavoriteWords
  );

  const { user: currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const languagesAPI = useSelector(
    (state) => state.wordDefinition.languagesAPI
  );
  const countryFlags = useSelector(
    (state) => state.wordDefinition.countryFlags
  );

  useEffect(() => {
    if (currentUser && dataAllFavoriteWords.length === 0) {
      dispatch(getAllUserFavoriteWords(currentUser.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!currentUser) {
    return <Redirect to="/login" />;
  } else {
    return (
      <Container className="my-5">
        {loadingAllFavoriteWords ? (
          <Row>
            <Col>
              <h2 className="text-center">Loading</h2>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col>
              {dataAllFavoriteWords.map((data, index) => (
                <div key={index}>
                  {data.favorite_words.map((fav, i) => (
                    <div key={i}>
                      <div className="d-flex justify-content-center text-center">
                        <h1>
                          <ReactCountryFlag
                            countryCode={
                              countryFlags[
                                languagesAPI.findIndex(
                                  (el) => el === fav.language
                                )
                              ]
                            }
                            svg
                            style={{
                              fontSize: "0.5em",
                            }}
                            className="mr-2"
                          />
                          {fav.word}
                        </h1>
                        <Button
                          variant="danger"
                          onClick={() =>
                            dispatch(removeFavoriteWord(fav.id, currentUser.id))
                          }
                          className="ml-5"
                        >
                          <FontAwesomeIcon
                            className="text-light mr-2"
                            icon={faTimes}
                          />
                          Remove
                        </Button>
                      </div>

                      <p>
                        <u className="text-success">Definition:</u>{" "}
                        {fav.definition}
                      </p>
                      {fav.example ? (
                        <p>
                          <u className="text-danger">Example:</u>{" "}
                          <cite>"{fav.example}"</cite>
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              ))}
            </Col>
          </Row>
        )}
        <div>
          {errorGetAllFavoriteWords ? (
            <p className="text-danger">
              Error: {JSON.stringify(errorGetAllFavoriteWords)}
            </p>
          ) : null}
        </div>
      </Container>
    );
  }
};

export default UserFavoriteWords;
