import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { signOutUser, getAuthID } from './firebase.js'
import { getBase } from "./webSettings.js";

function App() {
  const [count, setCount] = useState(0)

  function handleRedirectToAddRestaurant(e){
    window.location.href = getBase() + 'addRestaurant/'
  }

  function handleRedirectToFindRestaurants(e){
    window.location.href = getBase() + 'findRestaurants/'
  }

  function handleRedirectToManageFriends(e){
    window.location.href = getBase() + 'manageFriends/'
  }

  function handleRedirectToManageProfile(e){
    window.location.href = getBase() + 'manageProfile/'
  }

  function handleRedirectToFavoritedRestaurants(e){
    window.location.href = getBase() + 'viewFavoritedRestaurants/'
  }

  async function handleRedirectToUserProfile(e){
    const id = await getAuthID()
    window.location.href = getBase() + 'viewUserProfile/?user=' + id
  } 

  function handleSignOut(e){
    signOutUser()
  }

  return (
    <div className="App">
      <h1>Friends&Family Reviews</h1>
      <div className='Selection'>
        <button onClick={handleRedirectToAddRestaurant}>Add Restaurant</button>
        <button onClick={handleRedirectToFindRestaurants}>Find Restaurants</button>
        <button onClick={handleRedirectToFavoritedRestaurants}>View Favorited Restaurants</button>
        <button onClick={handleRedirectToUserProfile}>View Profile</button>
        <button onClick={handleRedirectToManageFriends}>Manage Friends</button>
        <button onClick={handleRedirectToManageProfile}>Manage Profile</button>
        
      </div>
      <br />
      <button onClick={handleSignOut} id="SignOut">Sign Out</button>
    </div>
  )
}

export default App
