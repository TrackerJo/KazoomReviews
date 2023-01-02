import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState, useEffect } from 'react'
import { getCurrentUserProfile, updateProfileInfo, reauthenticateUser, changePassword, updateUserPreferences, updateFriendSettings } from '../firebase'
import './manageProfile.css'
import '../index.css'
import SignIn from '../login/signIn'
import back from '../assets/white_back_arrow.png'
import { getBase } from '../webSettings.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ManageProfile />
  </React.StrictMode>,
)



function ManageProfile() {

  const [profile, setProfile] = useState([])
  const [changedEmail, setChangedEmail] = useState(false)
  const [changedProfileSettings, setChangedProfileSettings] = useState(false)
  const [changedPreferenceSettings, setChangedPreferenceSettings] = useState(false)
  const [changedFriendSettings, setChangedFriendSettings] = useState(false)
  const [changedAccountSettings, setChangedAccountSettings] = useState(false)
  const [reauthenticatingUser, setReauthenticatingUser] = useState(false)
  const [changingPassword, setChangingPassword] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  

  //Check if escape key is pressed
  document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
      //Close login prompt
      setChangingPassword(false);
      setReauthenticatingUser(false);
    }
  }
  
  useEffect(() => {
    async function load(){
      let profile = await getCurrentUserProfile()
      setProfile(profile)
      console.log(profile)
      console.log(profile.Preferences.Coffee.roastingStyle)
      setIsLoaded(true)
      
    }
    //wait a second before loading
    setTimeout(() => {
      load()
    }, 600)
  }, [])

  function handleBackArrow(e){
    window.location.href = getBase()
  }

 
  function openCollapsible(e){
    let content = e.target.nextElementSibling
    //Check if parent is also collapsible
    if (e.target.parentElement.className == 'content'){
        parent = e.target.parentElement
        
        let maxHeight = parent.scrollHeight + content.scrollHeight
        //Increase height of parent
        parent.style.maxHeight =  maxHeight + "px"
        console.log("parent is also collapsible", parent, maxHeight)
    }
    

    e.target.classList.toggle("active");
    
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  }

  function changeValue(e){
    console.log(e.target)
    
    if(e.target.name == 'Email'){
      setChangedEmail(true)
    }
    if(e.target.classList.contains("ProfileSettings")){
      let newProfile = {...profile}
      if(e.target.name == "Name"){
        newProfile[e.target.name] = e.target.value
      } else {
        newProfile.ProfileSettings[e.target.name] = e.target.value
      }
      setProfile(newProfile)
      setChangedProfileSettings(true)
    }
    if(e.target.classList.contains("PreferenceSettings")){
      let newProfile = {...profile}
      console.log(newProfile.Preferences[e.target.parentElement.id])
      console.log(e.target.parentElement.id)
      newProfile.Preferences[e.target.parentElement.id][e.target.name] = e.target.value
      setProfile(newProfile)
      console.log(profile)
      setChangedPreferenceSettings(true)
    }
    if(e.target.classList.contains("FriendSettings")){
      let newProfile = {...profile}
      if(e.target.name == "allowSuggestedFriends"){
        newProfile.FriendSettings[e.target.name] = e.target.checked
      } else {
        newProfile.FriendSettings[e.target.name] = e.target.value
      }
      setProfile(newProfile)
      setChangedFriendSettings(true)
    }
    if(e.target.classList.contains("AccountSettings")){
      setProfile({...profile, [e.target.name]: e.target.value})
      setChangedAccountSettings(true)
    }
  }

  function updateAccountSettings(e){
    console.log("update account settings")
  }

  function handleUpdateFriendSettings(e){
    console.log("update friend settings")
    updateFriendSettings(profile.FriendSettings)
  }


  async function updateProfileSettings(e){
    await updateProfileInfo(profile)
    console.log("update profile settings")
  }

  async function Reauthenticate(email, password){
    setReauthenticatingUser(false)
    await reauthenticateUser(email, password)
    setChangingPassword(true)
    
  }

  async function handleUpdatePasswordClick(e){
    setReauthenticatingUser(true)
    console.log("update password")
  }
  
  async function updatePassword(e){
    //Get password and confirmed password by id
    let password = document.getElementById("password")
    let confirmedPassword = document.getElementById("confirmedPassword")
    //Check if password is valid
    if (password.value.length < 6){
      alert("Password must be at least 6 characters")
      password.value = ""
      confirmedPassword.value = ""
      return
    }
    //Check if password is the same
    if (password.value != confirmedPassword.value){

      alert("Passwords do not match")
      password.value = ""
      confirmedPassword.value = ""
      return
    }
    //Update password
    await changePassword(password.value)
    setChangingPassword(false)
    console.log("updated password")

  }

  async function handleUpdatePreferences(e){
    await updateUserPreferences(profile.Preferences)
    console.log("update preferences")
  }

  if(isLoaded){

      return (
        <>
          <div className="ManageProfile">
            <img src={back} alt="back arrow" className='back' onClick={handleBackArrow}/>
            <h1>Manage Profile</h1>
            <div className='Settings' onChange={changeValue}>
                <button className="collapsible" onClick={openCollapsible}>Profile Settings</button>
                <div className="content" >
                    <br />
                    <label htmlFor="Name">Display Name: </label>
                    <input type="text" id="Name" name="Name" className='ProfileSettings' defaultValue={profile.Name} />
                    <br />
                    <label htmlFor="favoritedRestaurantsVisibility">Favorited Restaurants Visibility: </label>
                    <select name="favoritedRestaurantsVisibility" id="favoritedRestaurantsVisibility" className='ProfileSettings' defaultValue={profile.ProfileSettings.favoritedRestaurantsVisibility}>

                        <option value="Public">Public</option>
                        <option value="Friends">Friends</option>
                        <option value="Private">Private</option>
                    </select>
                    <br />
                    {changedProfileSettings ? <button onClick={updateProfileSettings}>Save Changes</button> : null}
                    <br />
                    <br />
                </div>
                <button className="collapsible" onClick={openCollapsible}>Preference Settings</button>
                <div className="content">
                  <br />
                    <button className="collapsible" onClick={openCollapsible}>Coffee Preferences</button>
                    <div className="content" id="Coffee">
                      <br />
                      <label htmlFor="roastingStyle">Roasting Styles: </label>
                        <select name="roastingStyle" id="roastingStyle" className='PreferenceSettings' defaultValue={profile.Preferences.Coffee.roastingStyle}>
                            <option value="Light">Light</option>
                            <option value="Medium">Medium</option>
                            <option value="Dark">Dark</option>
                        </select>
                        <br />
                        <label htmlFor="syrupType">Syrup Types: </label>
                        <select name="syrupType" id="syrupType" className='PreferenceSettings' defaultValue={profile.Preferences.Coffee.syrupType}>
                            <option value="Homemade">Homemade</option>
                            <option value="Premade">Premade</option>
                        </select>
                        <br />
                        <label htmlFor="milkType">Milk Types: </label>
                        <select name="milkType" id="milkType" className='PreferenceSettings' defaultValue={profile.Preferences.Coffee.milkType}>
                            <option value="Whole">Whole Milk</option>
                            <option value="Almond">Almond</option>
                            <option value="Oat">Oat</option>
                            <option value="Soy">Soy</option>
                        </select>
                        <br />
                        <label htmlFor="coffeeType">Coffee Types: </label>
                        <select name="coffeeType" id="coffeeType" className='PreferenceSettings' defaultValue={profile.Preferences.Coffee.coffeeType}>
                            <option value="Espresso">Espresso</option>
                            <option value="Americano">Americano</option>
                            <option value="Latte">Latte</option>
                            <option value="Cappuccino">Cappuccino</option>
                            <option value="Mocha">Mocha</option>
                            <option value="Macchiato">Macchiato</option>
                            <option value="Frappuccino">Frappuccino</option>
                            <option value="Iced Coffee">Iced Coffee</option>
                        </select>
                        <br />
                        <br /> 
                        

                    </div>
                    <br />
                    <button className="collapsible" onClick={openCollapsible}>Meat Preferences</button>
                    <div className="content" id='Meat'>
                      <br />
                      <label htmlFor="meatType">Meat Types: </label>
                        <select name="meatType" id="meatType" className='PreferenceSettings' defaultValue={profile.Preferences.Meat.meatType}>
                            <option value="Beef">Beef</option>
                            <option value="Pork">Pork</option>
                            <option value="Chicken">Chicken</option>
                            <option value="Fish">Fish</option>
                            <option value="Vegan">Vegan</option>
                        </select>
                        <br />
                        <label htmlFor="meatStyle">Meat Styles: </label>
                        <select name="meatStyle" id="meatStyle" className='PreferenceSettings' defaultValue={profile.Preferences.Meat.meatStyle}>
                            <option value="Grilled">Grilled</option>
                            <option value="Fried">Fried</option>
                            <option value="Baked">Baked</option>
                            <option value="Steamed">Steamed</option>
                        </select>
                        <br />
                        <label htmlFor="meatCook">Meat Cook: </label>
                        <select name="meatCook" id="meatCook" className='PreferenceSettings' defaultValue={profile.Preferences.Meat.meatCook}>
                            <option value="Rare">Rare</option>
                            <option value="Medium Rare">Medium Rare</option>
                            <option value="Medium">Medium</option>
                            <option value="Medium Well">Medium Well</option>
                            <option value="Well Done">Well Done</option>
                        </select>
                        <br />
                        <br />

                    </div>
                    <br />
                    <button className="collapsible" onClick={openCollapsible}>Pizza Preferences</button>
                    <div className="content" id='Pizza'>
                      <br />
                      <label htmlFor="pizzaType">Pizza Types: </label>
                        <select name="pizzaType" id="pizzaType" className='PreferenceSettings' defaultValue={profile.Preferences.Pizza.pizzaType}>
                            <option value="Pepperoni">Pepperoni</option>
                            <option value="Cheese">Cheese</option>
                            <option value="Veggie">Veggie</option>
                            <option value="Meat Lovers">Meat Lovers</option>
                            <option value="Vegan">Vegan</option>
                        </select>
                        <br />
                        <label htmlFor="pizzaStyle">Pizza Style: </label>
                        <select name="pizzaStyle" id="pizzaStyle" className='PreferenceSettings' defaultValue={profile.Preferences.Pizza.pizzaStyle}>
                            <option value="Thin Crust">Thin Crust</option>
                            <option value="Thick Crust">Thick Crust</option>
                            <option value="Deep Dish">Deep Dish</option>
                        </select>
                        <br />
                        <br />
                    </div>
                    <br />
                    {changedPreferenceSettings ? <button onClick={handleUpdatePreferences}>Save Changes</button> : null}
                    <br />
                    <br />
                </div>
                <button className="collapsible" onClick={openCollapsible}>Friend Settings</button>
                <div className="content">
                    <br />
                    <label htmlFor="allowSuggestedFriends">Allow Suggested Friends: </label>
                    <input type="checkbox" id="allowSuggestedFriends" name="allowSuggestedFriends" className='FriendSettings' defaultChecked={profile.FriendSettings.allowSuggestedFriends}/>
                    <br />
                    <p htmlFor="minSimilarities">Minimum number of similarites <br></br> for suggested friends and reviews: </p>
                    <input type="number" id="minSimilarities" name="minSimilarities" className='FriendSettings' defaultValue={profile.FriendSettings.minSimilarities}/>
                    <br />
                    <br />
                    <br />
                    {changedFriendSettings ? <button onClick={handleUpdateFriendSettings}>Save Changes</button> : null}
                    <br />
                    <br />
                </div>
                <button className="collapsible" onClick={openCollapsible}>Account Settings</button>
                <div className="content">
                  <br />
                  <label htmlFor="changePassword" id='changePasswordLabel'>Password: </label>
                  <button id='changePassword' onClick={handleUpdatePasswordClick}>Change Password</button>
                  <br />
                  
                  <label htmlFor="Email">Email: </label>
                  <input type="text" id="Email" name="Email" defaultValue={profile.Email} className='AccountSettings'/>
                  <br />
                  {changedAccountSettings ? <button onClick={updateAccountSettings}>Save Changes</button> : null}
                  <br />
                  <br />
                </div>
            </div>
          </div>
          { reauthenticatingUser ? 
          <div className='Login'>
            <h1>ReLogin</h1>
            <SignIn returnCredentials={Reauthenticate}/> 
          </div>
            : null}
          { changingPassword ?
          <div className='Login'>
            <h1>Change Password</h1>
            <label htmlFor="password">New Passowrd: </label>
            <input type="password" name='password' id='password'/>
            <br />
            <label htmlFor="confirmPassword">Confirm Password: </label>
            <input type="password" name='confirmPassword' id='confirmedPassword'/>
            <br />
            <button onClick={updatePassword}>Change Password</button>
          </div>
            : null}
        </>

      )
    }
    else{
      return(
        <div>
          
        </div>
      )
    }
}

export default ManageProfile