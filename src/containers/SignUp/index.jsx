import React, { useState } from "react";
import firebase from "firebase";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import AppLogo from "../../assets/logo.png";
import { AuthContext } from "../../context";

export default function SignUp(props) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { SignUp } = React.useContext(AuthContext);
  const db = firebase.database();

  const handleClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    //wait to signup
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      //make res asynchonous so that we can make grab the token before saving it.
      .then(async (res) => {
        //grab token from local storage and set to state.
        if (res) {
          db.ref("Users/Admin").push({
            Name: userName,
            Email: email,
            Password: password,
          });
          // SignUp();
          setIsLoading(false);
          props.history.push("/login");
        }
      })
      .catch((err) => {
        // console.log("Register -> err", err);
        setErrors(err.toString());
        setIsLoading(false);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUserName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <form className='form-signin' onSubmit={handleClick}>
      <div className='text-center mb-4'>
        <img
          className='mb-4 App-logo'
          src={AppLogo}
          alt=''
          style={{ width: 125, height: 90 }}
        />
        <h1 className='h3 mb-3 font-weight-normal'>Sign Up</h1>
      </div>

      <div className='form-label-group'>
        <input
          type='text'
          name='username'
          id='inputName'
          className='form-control'
          placeholder='User name'
          value={userName}
          onChange={handleChange}
          required
          autoFocus
        />
        <label htmlFor='inputEmail'>User Name</label>
      </div>

      <div className='form-label-group'>
        <input
          type='email'
          id='inputEmail'
          name='email'
          className='form-control'
          placeholder='Email address'
          value={email}
          onChange={handleChange}
          required
          autoFocus
        />
        <label htmlFor='inputEmail'>Email address</label>
      </div>

      <div className='form-label-group'>
        <input
          type='password'
          id='inputPassword'
          name='password'
          className='form-control'
          placeholder='Password'
          value={password}
          onChange={handleChange}
          required
        />
        <label htmlFor='inputPassword'>Password</label>
      </div>

      <div className='checkbox mb-3'>
        <label>
          Already have an account, <Link to='login'>Login here!</Link>
        </label>
      </div>
      <button className='btn btn-lg btn-primary btn-block' type='submit'>
        <div className='sign-in-button'>
          Sign up{" "}
          <ClipLoader
            color='#fff'
            size={30}
            css={{ marginLeft: 10 }}
            loading={isLoading}
          />
        </div>
      </button>
      {errors ? <p style={{ color: "red" }}>{errors}</p> : null}
      <p className='mt-5 mb-3 text-muted text-center'>&copy; 2017-2020</p>
    </form>
  );
}
