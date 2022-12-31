import { useState } from 'react'
import './sentRequestLabel.css'
import { removeSentFriendRequest } from '../firebase'


function SentRequestLabel({request, updateSentRequests}) {
 
   function handleRemoveRequest() {
    removeSentFriendRequest(request.uid)
    updateSentRequests()
   }

  return (
    <div className="SentRequestLabel">
      <label>{request.Name}</label>
      <img src="./assets/x_circle_white.png" alt="remove request" className='remove' onClick={handleRemoveRequest}/>
    </div>
  )
}

export default SentRequestLabel