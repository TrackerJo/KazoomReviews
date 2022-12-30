import { useState } from 'react'
import './sentFriendRequests.css'
import SentRequestLabel from './sentRequestLabel'

function SentFriendRequests({sentRequests, updateSentRequests}) {
 
   

  return (
    <div className="SentFriendRequests">
      <br />
        <div className="sentRequestsList">
            {sentRequests.map((request) => (
                    <SentRequestLabel key={request.uid} request={request} updateSentRequests={updateSentRequests}/>
            ))}
        </div>
    </div>
  )
}

export default SentFriendRequests