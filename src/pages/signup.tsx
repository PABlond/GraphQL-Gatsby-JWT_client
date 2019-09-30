import React, { useState, useEffect, SyntheticEvent } from "react"
import { Container, Form, Button } from "react-bootstrap"
import HandleSignup from "./../components/Auth/HandleSignup"
import { SignupForm } from "./../interfaces/auth.interface"
import Nav from "./../components/Navs"
import { isLoggedIn } from "./../actions/auth"
import { navigate } from "gatsby"

export default () => {
  const [signupReq, setsignupReq] = useState<boolean>(false)
  const [form, setForm] = useState<SignupForm>({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  })

  const handleChange = (e: any) => {
    setsignupReq(false)
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    setsignupReq(true)
  }

  const { firstname, lastname, email, password } = form
  const props = { firstname, lastname, email, password }

  useEffect(() => {
    if (isLoggedIn()) navigate("/dashboard")
  }, [])

  return (
    <>
      <Nav />
      <Container id="auth-container">
        <Form onSubmit={onSubmit}>
          <div id="auth-heading">
            <h1>Signup to Auth</h1>
            <p>
              Already have an account ?<a href="/login"> Login</a>
            </p>
          </div>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Firstname</Form.Label>
            <Form.Control
              type="text"
              name="firstname"
              placeholder="John"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Lastname</Form.Label>
            <Form.Control
              type="text"
              name="lastname"
              placeholder="Doe"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="john.doe@example.net"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="********"
              onChange={handleChange}
            />
          </Form.Group>

          <Button block type="submit">
            Submit
          </Button>
        </Form>

        {signupReq && <HandleSignup {...props} />}
      </Container>
    </>
  )
}
