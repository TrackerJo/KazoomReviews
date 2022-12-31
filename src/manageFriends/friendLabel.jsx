import { useState } from 'react'
import './friendLabel.css'
import { removeFriend } from '../firebase.js'


function FriendLabel({friend, updateFriends}) {
 
   async function handleRemoveFriend() {
        await removeFriend(friend.uid)
        updateFriends()
   }

  return (
    <div className="FriendLabel">
            <label>{friend.Name}</label>
            <img src="./assets/x_circle_white.png" alt="remove friend" className='remove' onClick={handleRemoveFriend}/>  

    </div>
  )
}

export default FriendLabel