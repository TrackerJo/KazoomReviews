import { useState } from 'react'
import './friendRequests.css'
import FriendRequestLabel from './friendRequestLabel'

function FriendRequests({friendRequests, updateFriendRequests, updateFriends}) {
 
   

  return (
    <div className="FriendRequests">
      <br />
        <div className="friendRequestsList">
            {friendRequests.map((friend) => (
                    <FriendRequestLabel key={friend.uid} friend={friend} updateFriendRequests={updateFriendRequests} updateFriends={updateFriends}/>
            ))}
        </div>
    </div>
  )
}

export default FriendRequests