import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { ClipLoader } from "react-spinners";
import AppLogo from "../../assets/logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          if (res) {
            // SignIn();
            setIsLoading(false);
            // dispatch(
            //   loginUserSuccess({ user: res.user, accessToken: res.user.uid })
            // );
            // props.history.replace("/");
          }
        })
        .catch((err) => {
          console.log("handleSubmit -> err", err.toString());
          setErrors(err.toString());
          setIsLoading(false);
        });
    } catch (err) {
      setErrors(err.toString());
    }
  };
  return (
    <form className='form-signin' onSubmit={handleSubmit}>
      <div className='text-center mb-4'>
        <img
          className='mb-4 App-logo'
          src={AppLogo}
          alt=''
          style={{ width: 125, height: 90 }}
        />
        <h1 className='h3 mb-3 font-weight-normal'>Sign In</h1>
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
          Are you new? <Link to='signUp'>Sign Up Here</Link>
        </label>
      </div>
      <button className='btn btn-lg btn-primary btn-block' type='submit'>
        <div className='sign-in-button'>
          Sign in
          <ClipLoader
            color='#fff'
            size={30}
            css={{ marginLeft: 10 }}
            loading={isLoading}
          />
        </div>
      </button>
      {errors ? <p style={{ color: "red" }}>{errors}</p> : null}
      <p className='mt-5 mb-3 text-muted text-center'> 2020&copy;Sharity</p>
    </form>
  );
}
