import React, { useState, useEffect } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { ClipLoader, DotLoader } from "react-spinners";
import firebase from "firebase";
import SweetAlert from "react-bootstrap-sweetalert";

function UpdateOrganization(props) {
  console.log(
    "🚀 ~ file: index.jsx ~ line 8 ~ AddOrganization ~ testValue",
    props.location.params
  );
  const params = props.location.params;
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

  const updateState = () => {
    setOrgName(params.OrgName);
    setOrgEmail(params.OrgEmail);
    setOrgPassword(params.OrgPassword);
    setOrgAddress(params.OrgAddress);
    setOrgState(params.OrgState);
    setOrgCity(params.OrgCity);
  };

  useEffect(() => {
    updateState();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const getThisDone = () => {
    const getAlert = () => (
      <SweetAlert success title='Woot!' onConfirm={hideAlert}>
        Organization Updated Successfully!
      </SweetAlert>
    );

    setAlert(getAlert());
  };
  const hideAlert = () => {
    setAlert(null);
  };
  const getErrorDone = () => {
    const getAlert = () => (
      <SweetAlert warning title='Error!' onConfirm={hideAlert} timeout={2000}>
        Please fill all the values.
      </SweetAlert>
    );
    setAlert(getAlert());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      orgName !== "" &&
      orgEmail !== "" &&
      orgPassword !== "" &&
      orgAddress !== "" &&
      orgState !== "" &&
      orgCity !== ""
    ) {
      setSubmitLoading(true);
      database
        .ref("Users/Organization")
        .once("value")
        .then((snapshot) => {
          var status = "";
          snapshot.forEach((el) => {
            if (el.val().OrgEmail === orgEmail) {
              status = el.key;
            }
          });
          if (status) {
            database.ref("Users/Organization/" + status).update({
              OrgName: orgName,
              OrgEmail: orgEmail,
              OrgPassword: orgPassword,
              OrgAddress: orgAddress,
              OrgState: orgState,
              OrgCity: orgCity,
            });
          }
        })
        .catch((err) => {
          // console.log("Register -> err", err);
          window.alert(err.toString());
        });

      setTimeout(() => {
        setSubmitLoading(false);
        getThisDone();
      }, 2000);
    } else {
      getErrorDone();
      // window.alert("Please fill all the values.");
    }
  };
  return (
    <>
      {loading ? (
        <div className='loading'>
          <DotLoader size={80} color='#bb2265' />
        </div>
      ) : (
        <div className='container mt-5'>
          {alert}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formGridAddress2'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={(e) => setOrgName(e.target.value)}
                placeholder='Organization Name'
                type='text'
                value={orgName}
              />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId='formGridEmail'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  disabled
                  onChange={(e) => setOrgEmail(e.target.value)}
                  placeholder='Enter organization email'
                  type='email'
                  value={orgEmail}
                />
              </Form.Group>

              <Form.Group as={Col} controlId='formGridPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={(e) => setOrgPassword(e.target.value)}
                  placeholder='Generate password'
                  type='text'
                  value={orgPassword}
                />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId='formGridAddress1'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                onChange={(e) => setOrgAddress(e.target.value)}
                placeholder='Organization address'
                type='text'
                value={orgAddress}
              />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId='formGridState'>
                <Form.Label>State</Form.Label>
                <Form.Control
                  as='select'
                  defaultValue='Choose...'
                  value={orgState}
                  onChange={(e) => setOrgState(e.target.value)}>
                  <option>Choose...</option>
                  <option>Punjab</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId='formGridCity'>
                <Form.Label>City</Form.Label>
                <Form.Control
                  as='select'
                  value={orgCity}
                  defaultValue='Choose...'
                  onChange={(e) => setOrgCity(e.target.value)}>
                  <option>Choose...</option>
                  <option>Islamabad</option>
                  <option>Rawalpindi</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Button variant='primary' type='submit'>
              <div className='sign-in-button'>
                Update Organization
                <ClipLoader
                  color='#fff'
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

export default UpdateOrganization;
