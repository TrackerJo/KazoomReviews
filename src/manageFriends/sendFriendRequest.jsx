import { useState } from 'react'
import { sendFriendRequest } from '/src/firebase.js'
import './sendFriendRequest.css'

function SendFriendRequest({ isShown, setIsShown, updateSentRequests}) {
    
    const [name, setName] = useState("")
 

    function handleExit(e){
        document.getElementById('name').value = ''
        setIsShown('hidden')
    }

    function handleNameChange(e){
        setName(e.target.value)
    }

   

    async function handleSendRequest(e){
      await  sendFriendRequest(name)
      updateSentRequests()
      handleExit()
    }

    return (
    <div className="Prompt" id={isShown}>
       <img src="src/assets/x_circle_fill.png" alt="exit prompt" className='exit' onClick={handleExit}/> 
       <h1>Send Friend Request</h1>
        
        <div className='PromptInfo'>
        <label>Friend's Name</label>
        <br />
            <input type="text" id="name" onChange={handleNameChange}/>
            
            <br />

            <button onClick={handleSendRequest}>Send Friend Request</button>
        </div>
    </div>
    )
}

export default SendFriendRequest
