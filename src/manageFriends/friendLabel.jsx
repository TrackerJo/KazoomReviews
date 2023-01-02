import { useState } from 'react'
import './friendLabel.css'
import { removeFriend } from '../firebase.js'
import x from '../assets/x_circle_white.png'
import { getBase } from '../webSettings.js'

function FriendLabel({friend, updateFriends}) {
 
   async function handleRemoveFriend() {
        await removeFriend(friend.uid)
        updateFriends()
   }

   function handleLabelClick() {
        window.location.href = getBase() + 'viewUserProfile/?user=' + friend.uid
   }

  return (
    <div className="FriendLabel" onClick={handleLabelClick}>
            <label>{friend.Name}</label>
            <img src={x} alt="remove friend" className='remove' onClick={handleRemoveFriend}/>  

    </div>
  )
}

export default FriendLabel