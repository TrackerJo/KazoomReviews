import { useState } from 'react'
import './suggestedFriendLabel.css'
import { sendFriendRequest } from '../firebase.js'
import { getBase } from '../webSettings.js'

function SuggestedFriendLabel({suggestedFriend, updateSuggestedFriends, updateSentRequests}) {
 
   async function handleAddFriend() {
        await sendFriendRequest(suggestedFriend.Name)
        updateSentRequests()
        updateSuggestedFriends()
   }

   function handleLabelClick() {
        window.location.href = getBase() + 'viewUserProfile/?user=' + suggestedFriend.uid
   }

  return (
    <div className="FriendLabel" onClick={handleLabelClick}>
            <label className='name'>{suggestedFriend.Name}</label>
            <label className="similarity">{suggestedFriend.Similarity}</label>
          <button className='addFriend' onClick={handleAddFriend}>Add Friend</button>

    </div>
  )
}

export default SuggestedFriendLabel