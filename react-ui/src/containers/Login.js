import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Form as FormBootstrap,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { login } from "../redux";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(username, password))
        .then(() => {
          props.history.push("/");
          // window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Container className="my-5">
      <Row className="mb-5">
        <Col>
          <h1 className="text-warning text-center">Welcome back!</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={10} md={8} lg={6} className="mx-auto">
          <Form onSubmit={handleLogin} ref={form}>
            <FormBootstrap.Group>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={username}
                placeholder="Username"
                onChange={onChangeUsername}
                validations={[required]}
              />
            </FormBootstrap.Group>

            <FormBootstrap.Group>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={password}
                placeholder="Password"
                onChange={onChangePassword}
                validations={[required]}
              />
            </FormBootstrap.Group>

            <FormBootstrap.Group>
              <button className="btn btn-primary btn-block" disabled={loading}>
                {loading && (
                  <Spinner
                    animation="border"
                    role="status"
                    as="span"
                    aria-hidden="false"
                    className="align-middle me-2"
                    size="sm"
                  >
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                )}
                <span>Login</span>
              </button>
            </FormBootstrap.Group>

            {message && (
              <FormBootstrap.Group>
                <Alert variant="danger">{message}</Alert>
              </FormBootstrap.Group>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
