import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { register } from "../redux";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const SignUp = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(username, email, password))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <Container className="my-5">
      <Row className="mb-5">
        <Col className="text-center">
          <h1 className="text-success">Sign Up</h1>
          <p className="lead">You will be able to access these features: </p>
          <p className="m-0">Find a definition also in French and Spanish</p>
          <p className="m-0">Save a word definition in your favorites</p>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={10} md={8} lg={6} className="mx-auto">
          <Form onSubmit={handleRegister} ref={form}>
            {!successful && (
              <div>
                <div className="form-group">
                  <Input
                    type="text"
                    className="form-control mb-3"
                    name="username"
                    value={username}
                    placeholder="Username"
                    onChange={onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>
                <div className="form-group">
                  <Input
                    type="text"
                    className="form-control mb-3"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={onChangeEmail}
                    validations={[required, validEmail]}
                  />
                </div>
                <div className="form-group">
                  <Input
                    type="password"
                    className="form-control mb-3"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>
                <div className="form-group">
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            )}

            {/* {message && (
              <div className="form-group">
                <Alert variant={!successful ? "danger" : null}>{message}</Alert>
              </div>
            )} */}
            {message && successful && (
              <div>
                <Alert variant="success">{message}</Alert>
                <h4 className="text-center">
                  Now you can go{" "}
                  <Link to="/login" className="text-success">
                    login
                  </Link>
                </h4>
              </div>
            )}

            {message && !successful && (
              <div>
                <Alert variant="danger">{message}</Alert>
                <p>Please try again later.</p>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
