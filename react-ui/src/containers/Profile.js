import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Container,
  Form,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import DisplayAuthorities from "../components/DisplayAuthorities";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <Container className="my-5">
      <header className="bg-light mb-5">
        <h3 className="fw-bold text-center border p-5">Your profile</h3>
      </header>
      <Row>
        <Col>
          <Form>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="2">
                Username
              </Form.Label>
              <Col sm="10">
                <InputGroup>
                  <FormControl defaultValue={currentUser.username} />
                  <Button variant="success">Update</Button>
                </InputGroup>
              </Col>
            </Form.Group>
          </Form>

          <Form>
            <Form.Group as={Row} controlId="formPlaintextEmail">
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
                <InputGroup>
                  <FormControl defaultValue={currentUser.email} />
                  <Button variant="success">Update</Button>
                </InputGroup>
              </Col>
            </Form.Group>
          </Form>

          {currentUser.isAdmin || currentUser.isModo ? (
            <>
              <p className="fw-bold mt-3">Authorities:</p>
              <DisplayAuthorities />
            </>
          ) : null}
        </Col>
      </Row>

      <hr className="my-5" />

      <Row>
        <Col>
          <Form>
            <Form.Group as={Row} controlId="formPlaintextEmail">
              <Form.Label column sm="2">
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
