import { useState } from 'react'
import './friends.css'
import FriendLabel from './friendLabel.jsx'


function Friends({friends, updateFriends}) {
 
   

  return (
    <div className="Friends">
        <br />
        <div className="friendList">
            {friends.map((friend) => (
                    <FriendLabel key={friend.uid} friend={friend} updateFriends={updateFriends}/>
            ))}
        </div>
                    

    </div>
  )
}

export default Friends