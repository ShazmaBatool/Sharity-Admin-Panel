import React, { useState, useEffect } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { ClipLoader, DotLoader } from "react-spinners";
import firebase from "firebase";
import SweetAlert from "react-bootstrap-sweetalert";

function AddOrganization() {
  const [orgName, setOrgName] = useState("");
  const [orgEmail, setOrgEmail] = useState("");
  const [orgPassword, setOrgPassword] = useState("");
  const [orgAddress, setOrgAddress] = useState("");
  const [orgState, setOrgState] = useState("");
  const [orgCity, setOrgCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const database = firebase.database();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const getThisDone = () => {
    const getAlert = () => (
      <SweetAlert success title="Woot!" onConfirm={hideAlert}>
        Organization Added Successfully!
      </SweetAlert>
    );

    setAlert(getAlert());
  };
  const hideAlert = () => {
    setAlert(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    database.ref("Users/" + "Organization").push({
      OrgName: orgName,
      OrgEmail: orgEmail,
      OrgPassword: orgPassword,
      OrgAddress: orgAddress,
      OrgState: orgState,
      OrgCity: orgCity,
    });
    setTimeout(() => {
      setSubmitLoading(false);
      getThisDone();
    }, 2000);
  };
  return (
    <>
      {loading ? (
        <div className="loading">
          <DotLoader size={80} />
        </div>
      ) : (
        <div className="container mt-5">
          {alert}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formGridAddress2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="Organization Name"
                type="text"
              />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  onChange={(e) => setOrgEmail(e.target.value)}
                  placeholder="Enter organization email"
                  type="email"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={(e) => setOrgPassword(e.target.value)}
                  placeholder="Generate password"
                  type="password"
                />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control
                onChange={(e) => setOrgAddress(e.target.value)}
                placeholder="Organization address"
                type="text"
              />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="Choose..."
                  onChange={(e) => setOrgState(e.target.value)}
                >
                  <option>Choose...</option>
                  <option>Punjab</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="Choose..."
                  onChange={(e) => setOrgCity(e.target.value)}
                >
                  <option>Choose...</option>
                  <option>Islamabad</option>
                  <option>Rawalpindi</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control />
              </Form.Group>
            </Form.Row>

            <Button variant="primary" type="submit">
              <div className="sign-in-button">
                Submit
                <ClipLoader
                  color="#fff"
                  size={20}
                  css={{ marginLeft: 10 }}
                  loading={submitLoading}
                />
              </div>
            </Button>
          </Form>
        </div>
      )}
    </>
  );
}

export default AddOrganization;
