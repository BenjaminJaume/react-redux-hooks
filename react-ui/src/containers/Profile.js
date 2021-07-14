import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Form,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import DisplayAuthorities from "../components/DisplayAuthorities";
import { setEmailForm, changeEmail } from "../redux";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.user);

  const [emailValue, setEmailValue] = useState("");

  const {
    changeEmailForm,
    loadingChangeEmail,
    successChangeEmail,
    messageChangeEmail,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <header className="bg-light mb-5">
            <h3 className="fw-bold text-center border p-5">Your profile</h3>
          </header>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Form>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="2" className="font-monospace">
                Username
              </Form.Label>
              <Col sm="10">
                <InputGroup>
                  <FormControl
                    defaultValue={currentUser.username}
                    readOnly
                    plaintext
                  />
                </InputGroup>
              </Col>
            </Form.Group>
          </Form>

          <Form>
            <Form.Group as={Row} controlId="formPlaintextEmail">
              <Form.Label column sm="2" className="font-monospace">
                Email
              </Form.Label>
              <Col sm="10">
                <InputGroup>
                  <FormControl
                    value={!changeEmailForm ? currentUser.email : emailValue}
                    readOnly={changeEmailForm ? false : true}
                    onChange={(event) => {
                      setEmailValue(event.target.value);
                    }}
                    placeholder={currentUser.email}
                  />

                  {!changeEmailForm ? (
                    <Button
                      variant="success"
                      onClick={() => dispatch(setEmailForm(true))}
                    >
                      Update
                    </Button>
                  ) : (
                    <>
                      {!loadingChangeEmail ? (
                        <>
                          <Button
                            variant="danger"
                            onClick={() => dispatch(setEmailForm(false))}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="success"
                            onClick={() =>
                              dispatch(changeEmail(currentUser.id, emailValue))
                            }
                          >
                            Confirm
                          </Button>
                        </>
                      ) : (
                        <InputGroup.Text className="bg-warning text-white">
                          <Spinner
                            animation="border"
                            role="status"
                            as="span"
                            aria-hidden="true"
                            size="sm"
                          >
                            <span className="sr-only">Loading...</span>
                          </Spinner>
                        </InputGroup.Text>
                      )}
                    </>
                  )}
                </InputGroup>
              </Col>
              {messageChangeEmail && (
                <Alert
                  variant={successChangeEmail ? "success" : "danger"}
                  className="mt-2"
                >
                  {messageChangeEmail}
                </Alert>
              )}
            </Form.Group>
          </Form>

          {currentUser.isAdmin || currentUser.isModo ? (
            <>
              <p className="fw-bold mt-3 font-monospace">Authorities:</p>
              <DisplayAuthorities />
            </>
          ) : null}
        </Col>
      </Row>

      <hr className="my-5" />

      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Form>
            <Form.Group as={Row} controlId="formPlaintextEmail">
              <Form.Label column sm="2" className="font-monospace">
                Password
              </Form.Label>
              <Col sm="10">
                <InputGroup>
                  <FormControl placeholder="Type your new password here" />
                  <Button variant="success">Update</Button>
                </InputGroup>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
