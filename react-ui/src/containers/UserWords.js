import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllUserWords } from "../redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import ReactCountryFlag from "react-country-flag";
import { removeWord } from "../redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const UserWords = () => {
  const loadingAllWords = useSelector((state) => state.word.loadingAllWords);
  const dataAllWords = useSelector((state) => state.word.dataAllWords);
  const errorGetAllWords = useSelector((state) => state.word.errorGetAllWords);

  const { user: currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const languagesAPI = useSelector((state) => state.word.languagesAPI);
  const countryFlags = useSelector((state) => state.word.countryFlags);

  useEffect(() => {
    if (currentUser) {
      dispatch(getAllUserWords(currentUser.id));
    }
  }, []);

  if (!currentUser) {
    return <Redirect to="/login" />;
  } else {
    return (
      <Container className="my-5">
        {loadingAllWords ? (
          <Row>
            <Col>
              <h2 className="text-center">Loading</h2>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col>
              {dataAllWords.map((data, index) => (
                <div key={index}>
                  <div className="d-flex justify-content-center text-center">
                    <h1>
                      <ReactCountryFlag
                        countryCode={
                          countryFlags[
                            languagesAPI.findIndex(
                              (el) => el === data.Word.language
                            )
                          ]
                        }
                        svg
                        style={{
                          fontSize: "0.5em",
                        }}
                        className="me-2"
                      />
                      {data.Word.word}
                    </h1>
                    <Button
                      variant="danger"
                      onClick={() =>
                        dispatch(removeWord(data.Word.id, currentUser.id))
                      }
                      className="ms-5"
                    >
                      <FontAwesomeIcon
                        className="text-light me-2"
                        icon={faTimes}
                      />
                      Remove
                    </Button>
                  </div>

                  <p>
                    <u className="text-success">Definition:</u>{" "}
                    {data.Word.definition}
                  </p>
                  {data.Word.example ? (
                    <p>
                      <u className="text-danger">Example:</u>{" "}
                      <cite>"{data.Word.example}"</cite>
                    </p>
                  ) : null}
                </div>
              ))}
            </Col>
          </Row>
        )}
        <div>
          {errorGetAllWords ? (
            <p className="text-danger">
              Error: {JSON.stringify(errorGetAllWords)}
            </p>
          ) : null}
        </div>
      </Container>
    );
  }
};

export default UserWords;
