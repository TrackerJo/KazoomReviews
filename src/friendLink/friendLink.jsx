import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState, useEffect } from 'react'
import { getUserProfile, checkLoginStatus, addFriend } from '../firebase.js'
import './friendLink.css'
import '../index.css'
import SignIn from '../login/signIn'
import SignUp from '../login/signUp'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <FriendLink />
    </React.StrictMode>,
  )
  

function FriendLink() {
 
   const [profile, setProfile] = useState([])
   const [loggedIn, setLoggedIn] = useState(-1)
   //Get user id from url parameter
    const urlParams = new URLSearchParams(window.location.search)
    const userId = urlParams.get('uid')
    const [createAccount, setCreateAccount] = useState(false)
   useEffect(() => {
        async function load()  {
            let loggedIn = await checkLoginStatus()
            let profile = await getUserProfile(userId)
            console.log(loggedIn)
            setLoggedIn(loggedIn)

            
            setProfile(profile)
        }
        //wait a second before loading
        setTimeout(() => {

        load()
        }, 500)
    }, [loggedIn])

    function onLogin(){
        setLoggedIn(true)
    }

    function handleReject(){
        //Redirect to home page
        window.location.href = '/'
    }

    async function handleAccept(){
        await addFriend(userId)
        window.location.href = '/'
    }

  return (
    <>
    {
    
    loggedIn == 1 ?
    <div className="FriendLink">
      <h1>Friend Request from {profile.Name}</h1>
      <label>Would you like to accept this friend request?</label>
        <br />
        <br />
        <img src="./assets/checkmark_circle_white.png" alt="accept" className='accept' onClick={handleAccept}/>
        <img src="./assets/x_circle_white.png" alt="reject" className='reject' onClick={handleReject}/>
    </div>
    :
    loggedIn == 0 ?
        createAccount ?
        <div className='Login'>
            <h1>Create Account</h1>
            <SignUp onLogin={onLogin}/>
        </div>
        :
        <div className='Login'>
            <h1>Login</h1>
            <SignIn onLogin={onLogin}/>
            <br />
            <button className='createAccount' onClick={() => {setCreateAccount(true)}}>Create Account</button>
        </div>
    :
    <div >
        
    </div>
    }
    </>
  )
}

export default FriendLink