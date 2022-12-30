import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState } from 'react'
import { createDoc } from '/src/firebase.js'
import './login.css'
import '/src/index.css'
import SignUp from './signUp'
import SignIn from './signIn'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginSelection />
  </React.StrictMode>,
)



function LoginSelection() {
  
  const [loginSelection, setSelection] = useState('None')

  function onLogin(){
    window.location.href = "index.html"
  }

  return (
    <div className="Login b1">
      <h1>Friends&Family Reviews</h1>
      { loginSelection == 'None' ? 
      <div className='Selections'>
        <button onClick={() => {setSelection('Sign In')}}>Sign In</button>
        <button onClick={() => {setSelection('Sign Up')}}>Sign Up</button>
      </div>
      :
      loginSelection == 'Sign In' ?
       <SignIn onLogin={onLogin}/>
        :
        <SignUp onLogin={onLogin}/>

      }
    </div>
  )
}

export default LoginSelection
