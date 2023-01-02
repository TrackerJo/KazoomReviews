import { useState } from 'react'
import './suggestedFriends.css'
import SuggestedFriendLabel from './suggestedFriendLabel.jsx'


function SuggestedFriends({suggestedFriends, updateSuggestedFriends, updateSentRequests}) {
 
   

  return (
    <div className="SuggestedFriends">
        <br />
        <div className="friendList">
            {suggestedFriends.map((suggestedFriend) => (
                    <SuggestedFriendLabel key={suggestedFriend.uid} suggestedFriend={suggestedFriend} updateSuggestedFriends={updateSuggestedFriends} updateSentRequests={updateSentRequests}/>
            ))}
        </div>
                    

    </div>
  )
}

export default SuggestedFriends