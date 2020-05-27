import React, { useState } from "react"
import { Link, Redirect } from "react-router-dom"
import { Button, Container, Typography, Checkbox, FormControlLabel, TextField} from '@material-ui/core'
import UserManager from "../../modules/UserManager"
import {firebaseApp} from '../../index'
import './Auth.css'

export default function Login(props) {
  const [loginValues, setLoginValues] = useState({
    isLoading: false,
    remember: false,
    error: {
      isEmailError: false,
      isPasswordError: false,
      errorMessage: ''
    },
    email: '',
    password: ''
  })

  function handleChange(e) {
    e.preventDefault()
    console.log('LOGINVALUES BEFORE SETLOGINVALUES', loginValues)
    console.log("TARGET.ID", e.target.id)
    console.log("TARGET.VALUE", e.target.value)
    setLoginValues([e.target.id = e.target.value])
    console.log('LOGINVALUES AFTER SETLOGINVALUES', loginValues)
  }

  function authHandler(user) {
    sessionStorage.setItem(
        "activeUser",
        JSON.stringify({
          email: loginValues.email
            // email: user.email,
            // displayName: user.displayName,
            // accountCreatedOn: user.metadata.creationTime,
            // lastSignIn: user.metadata.lastSignInTime,
            // photoURL: user.photoURL,
            // providerData: user.providerData,
            // uid: user.uid,
        })
    )

    loginValues.remember === true && localStorage.setItem(
        "activeUser",
        JSON.stringify({
          email: loginValues.email
            // email: user.email,
            // displayName: user.displayName,
            // accountCreatedOn: user.metadata.creationTime,
            // lastSignIn: user.metadata.lastSignInTime,
            // photoURL: user.photoURL,
            // providerData: user.providerData,
            // uid: user.uid,
        })
    )
    props.history.push('/')
}

function continueAsGuest() {
  console.log('CONTINUE AS GUEST NOT YET IMPLEMENTED')
}

  function doLoginWithEmail(email, password) {
    setLoginValues({isLoading: true})
    firebaseApp.auth().signInWithEmailAndPassword(loginValues.email, loginValues.password)
      .then(r => {
        console.log('SIGNIN SUCCESS. RETURN VAL', r)
        authHandler(r.user)
        return r
      })
      .catch(function (err) {
        setLoginValues({isLoading: false})
        const errorCode = err.code;

        if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
          setLoginValues({
            email: '',
            password: '',
            remember: false,
            error: {
              isEmailError: true,
              isPasswordError: true,
              errorMessage: 'email &/or password are incorrect or not found --- please re-enter both. if error continues, try resetting your password or creating a new account with your email'
            }
          })
        }
        else {
          console.log('unhandled error, ERROR VAL', loginValues.error)
        }
        //   account exists with different auth provider ?????
        return err
      }
      );

  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <div id='email-login-container' className='login-option email-login'>
          <Typography component='h1' variant='h5'>Log in w/Email</Typography>
          <form className='login-form'>
            {(loginValues.error?.isEmailError || loginValues.error?.isPasswordError) && <Typography id='login-error-message'>{loginValues.error?.errorMessage}</Typography>}
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='email'
              name='email'
              value={loginValues.email || ''}
              autoComplete='email'
              onChange={e => handleChange(e)}
              type='email'
              error={loginValues.error?.isEmailError}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='password'
              label='password'
              name='password'
              value={loginValues.password || ''}
              onChange={e => handleChange(e)}
              type='password'
              error={loginValues.error?.isPasswordError}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              onClick={() => doLoginWithEmail(loginValues.email, loginValues.password)}
              disabled={loginValues.isLoading}
            >
              Login
      </Button>
            <FormControlLabel
              control={<Checkbox value={loginValues.remember} onChange={(e) => handleChange(e)} color='primary' />}
              label='Remember Me'
            />
            <Typography id='forgot-password-link' component='h4' variant='h6'><Link to='/reset-password'>Forgot Password?</Link></Typography>

            <Typography id='register-new-account-link' component='h4' variant='h6'>Don't have and account? <Link to='/register'>Register here</Link></Typography>

          </form>
        </div>
        <hr />

        <hr />
        <div id='external-login-container' className='login-option external-login'>
          <Button
            type='button'
            fullWidth
            variant='contained'
            color='secondary'
            onClick={() => continueAsGuest()}
          >
            Continue as Guest
          </Button>
        </div>
      </Container>
    </>
  )
}