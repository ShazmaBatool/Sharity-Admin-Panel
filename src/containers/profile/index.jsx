import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { ClipLoader, DotLoader } from "react-spinners";
import firebase from "firebase";
import SweetAlert from "react-bootstrap-sweetalert";

export default function Profile() {
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPhone, setAdminPhone] = useState("");
  const [adminAddress, setAdminAddress] = useState("");
  const [adminState, setAdminState] = useState("");
  const [adminCity, setAdminCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const database = firebase.database();

  const getThisDone = () => {
    const getAlert = () => (
      <SweetAlert success title='Woot!' onConfirm={hideAlert}>
        Update Profile Successfully!
      </SweetAlert>
    );

    setAlert(getAlert());
  };
  const hideAlert = () => {
    setAlert(null);
  };
  const getErrorDone = () => {
    const getAlert = () => (
      <SweetAlert warning title='Warning!' onConfirm={hideAlert} timeout={2000}>
        Please fill the email field.
      </SweetAlert>
    );
    setAlert(getAlert());
  };
  const gettingAdminInfo = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      setCurrentUser(user);
      setAdminName(user.displayName);
      setAdminEmail(user.email);
      setImagePreviewUrl(user.photoURL);
      database
        .ref("Users/Admin")
        .once("value")
        .then(function (snapshot) {
          var result = Object.values(snapshot.val());
          setAdminPhone(result[0].Phone);
          setAdminAddress(result[0].Address);
          setAdminState(result[0].State);
          setAdminCity(result[0].City);
        });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    currentUser.updateProfile({
      displayName: adminName,
      email: adminEmail,
      photoURL: imagePreviewUrl,
    });
    database.ref("Users/Admin").push({
      Name: adminName,
      Email: adminEmail,
      Password: "7654321",
      Phone: adminPhone,
      Address: adminAddress,
      State: adminState,
      City: adminCity,
    });
    if (adminEmail === "") {
      getErrorDone();
    }
    setTimeout(() => {
      setSubmitLoading(false);
      getThisDone();
    }, 2000);
  };
  const getPhoto = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    var regex = new RegExp(
      "([a-zA-Z0-9s_\\.-:])+(.jpg|.JPG|.png|.PNG|.gif|.jpeg|.svg)$"
    );
    if (regex.test(file.name)) {
      reader.onloadend = () => {
        var image = new Image();
        image.src = reader.result;
        image.onload = () => {
          setImagePreviewUrl(reader.result);
          //   if (image.width <= 400 && image.height <= 120) {

          //     this.props.updateLogo(reader.result, file);
          //   } else {
          //     this.props.logoError();
          //   }
        };
      };
      reader.readAsDataURL(file);
    } else {
      alert("Wrong file extension...");
    }
  };
  React.useEffect(() => {
    gettingAdminInfo();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <div className='loading'>
          <DotLoader size={80} color='#bb2265' />
        </div>
      ) : (
        <div className='midOfScreen mt-5'>
          {alert}
          <div
            className='container wrap'
            style={{ backgroundColor: "#999", borderRadius: 15 }}>
            <div className='midOfScreen'>
              <label htmlFor='upload' className='blockico'>
                <img
                  alt=''
                  src={
                    imagePreviewUrl
                      ? imagePreviewUrl
                      : "https://res.cloudinary.com/wfdns6x2g6/image/upload/v1509007989/user_psolwi.png"
                  }
                  width='120'
                  height='120'
                  style={{ borderRadius: 60 }}
                />
                <input
                  type='file'
                  id='upload'
                  name='logofile'
                  style={{ display: "none" }}
                  onChange={getPhoto}
                />
              </label>
              <h2>{adminName}</h2>
              <h6>{adminEmail}</h6>
            </div>
            <div
              className='container'
              style={{ borderBottom: "2px solid #000", borderRadius: 1 }}></div>
            <Form onSubmit={handleSubmit} className='m-2'>
              <Form.Group controlId='formGridAddress2'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  onChange={(e) => setAdminName(e.target.value)}
                  placeholder='Name'
                  type='text'
                  value={adminName}
                />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId='formGridEmail'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder='e.g. someone@domain.com'
                    type='email'
                    value={adminEmail}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId='formGridPassword'>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    onChange={(e) => setAdminPhone(e.target.value)}
                    placeholder='923xxxxxxxxx'
                    type='phone'
                    value={adminPhone}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId='formGridAddress1'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  onChange={(e) => setAdminAddress(e.target.value)}
                  placeholder='Street or area'
                  type='text'
                  value={adminAddress}
                />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId='formGridState'>
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    as='select'
                    defaultValue={adminState ? adminState : "Choose..."}
                    onChange={(e) => setAdminState(e.target.value)}>
                    <option>Choose...</option>
                    <option>Punjab</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId='formGridCity'>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    as='select'
                    defaultValue={adminCity ? adminCity : "Choose..."}
                    onChange={(e) => setAdminCity(e.target.value)}>
                    <option>Choose...</option>
                    <option>Islamabad</option>
                    <option>Rawalpindi</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>

              <Button variant='primary' type='submit'>
                <div className='sign-in-button'>
                  Update Profile
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
        </div>
      )}
    </>
  );
}
