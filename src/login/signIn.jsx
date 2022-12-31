import { useState } from 'react'
import './signIn.css'
import { signIn } from '../firebase.js'

function SignIn({onLogin, returnCredentials}) {

  function handleSignIn(e){
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    //Validate input fields
    if(validate_email(email) == false){
      alert("Please enter a valid email")
      return
    }

    if(validate_password(password) == false){
      alert("Please make sure your password is at least 6 characters long")
      return
    }

    if(returnCredentials == null){
      signIn(email, password, onLogin)
    } else{
      returnCredentials(email, password)
    }
  }

  function validate_email(email){
    let expression = /^[^@]+@\w+(\.\w+)+\w$/
    if(expression.test(email) == true){
        return true
    } else{
        return false
    }
}

function validate_password(password){
    if(password < 6){
        return false
    } else{
        return true
    }
}

  return (
    <div className="SignIn">
      <label htmlFor="email">Email </label>
      <input type="text" id='email'/>
      <br />
      <label htmlFor="password">Password </label>
      <input type="password" id='password'/>
      <br />
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  )
}

export default SignIn
