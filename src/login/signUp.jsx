import { useState } from 'react'
import './signUp.css'
import { createUser } from '../firebase.js'

function SignUp({onLogin}) {
 
    function handleSignUp(e){
        const name = document.getElementById('name').value
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        //Validate input fields
        if(validate_name(name) == false){
            alert("Please enter your name")
            return
        }
        if(validate_email(email) == false){
            alert("Please enter a valid email")
            return
        }
        if(validate_password(password) == false){
            alert("Please make sure your password is at least 6 characters long")
            return
        }
        createUser(name, email, password, onLogin)
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

    function validate_name(name){
        if(name == null){
            return false
        }
    
        if(name.length <= 0){
            return false
        }
    
        return true
    }

  return (
    <div className="SignUp">
      <label htmlFor="name">Full Name </label>
      <input type="text" id='name'/>
      <br />
      <label htmlFor="email">Email </label>
      <input type="text" id='email'/>
      <br />
      <label htmlFor="password">Password </label>
      <input type="password" id='password'/>
        <br />
        <button onClick={handleSignUp}>Sign Up</button>
    </div>
  )
}

export default SignUp