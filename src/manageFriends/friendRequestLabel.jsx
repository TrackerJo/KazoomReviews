import { useState } from 'react'
import './friendRequestLabel.css'
import { acceptFriendRequest, rejectFriendRequest } from '../firebase'


function FriendRequestLabel({friend, updateFriendRequests, updateFriends}) {
 
   

    async function handleAcceptRequest() {
        await acceptFriendRequest(friend.uid)
        updateFriendRequests()
        updateFriends()
    }

    async function handleRejectRequest() {
        await rejectFriendRequest(friend.uid)
        updateFriendRequests()
    }

  return (
    <div className="FriendRequestLabel">
         <label>{friend.Name}</label>
         <img src="src/assets/x_circle_white.png" alt="reject request" className='reject' onClick={handleRejectRequest}/>
         <img src="src/assets/checkmark_circle_white.png" alt="accept request" className='accept' onClick={handleAcceptRequest}/>
      
    </div>
  )
}

export default FriendRequestLabel