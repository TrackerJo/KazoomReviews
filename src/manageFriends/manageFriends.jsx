import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState, useEffect } from 'react'
import { generateFriendRequestLink, getFriends, getFriendRequests, getSentFriendRequests, generateSuggestedFriends } from '../firebase'
import './manageFriends.css'
import '../index.css'
import Friends from './friends'
import FriendRequests from './friendRequests'
import SentFriendRequests from './sentFriendRequests'
import SendFriendRequest from './sendFriendRequest'
import SuggestedFriends from './suggestedFriends'
import link from '../assets/white_link.png'
import back from '../assets/white_back_arrow.png'
import addPerson from '../assets/add_person_fill_white.png'
import { getBase } from '../webSettings.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ManageFriends />
  </React.StrictMode>,
)



function ManageFriends() {
  
  const [view, setView] = useState('Friends')
  const [friends, setFriends] = useState([])
  const [friendRequests, setFriendRequests] = useState([])
  const [sentFriendRequests, setSentFriendRequests] = useState([])
  const [sendRequestVisisible, setSendRequestVisible] = useState('hidden')
  const [suggestedFriends, setSuggestedFriends] = useState([])
  
  useEffect(() => {
    async function load(){
      let friends = await getFriends()
      setFriends(friends)
      let friendRequests = await getFriendRequests()
      setFriendRequests(friendRequests)
      let sentFriendRequests = await getSentFriendRequests()
      setSentFriendRequests(sentFriendRequests)
      let suggestedFriends = await generateSuggestedFriends()
      setSuggestedFriends(suggestedFriends)
   
    }
    //wait a second before loading
    setTimeout(() => {
      load()
    }, 500)
  }, [])

  function handleBackArrow(e){
    window.location.href = getBase()
  }

  function handleTabClick(e){
    setView(e.target.innerText)
    //change class name to active
    document.querySelector('.active').className = ''
    e.target.className = 'active'

  }

  async function updateSentRequests(){
    let sentFriendRequests = await getSentFriendRequests()
    setSentFriendRequests(sentFriendRequests)
  }

  async function updateSuggestedFriends(){
    let suggestedFriends = await generateSuggestedFriends()
    setSuggestedFriends(suggestedFriends)
  }


  async function updateFriends(){
    let friends = await getFriends()
    setFriends(friends)
  }

  async function updateFriendRequests(){
    let friendRequests = await getFriendRequests()
    setFriendRequests(friendRequests)
  }

  async function handleCreateFriendLink(e){
    let link = await generateFriendRequestLink()
    //copy link to clipboard
    await navigator.clipboard.writeText(link)
    alert('Friend link copied to clipboard!')
    
  }

  


  return (
    <>
      <div className="ManageFriends">
        <img src={back} alt="back arrow" className='back' onClick={handleBackArrow}/>
        <h1>Manage Friends</h1>
        <br />
        <img src={addPerson} alt="add friend" className='addFriend' onClick={ () => setSendRequestVisible('visible')}/>
        <img src={link} alt="generate friend link" className='friendLink' onClick={handleCreateFriendLink}/>
        <ul>
            <li><a className="active" onClick={handleTabClick}>Friends</a></li>
            <li><a onClick={handleTabClick}>Friend Requests</a></li>
            <li><a onClick={handleTabClick}>Sent Friend Requests</a></li>
            <li><a onClick={handleTabClick}>Suggested Friends</a></li>
            
          </ul>
          {view == 'Friends' ?
          <Friends friends={friends} updateFriends={updateFriends}/>
          :
          view == 'Friend Requests' ?
          <FriendRequests friendRequests={friendRequests} updateFriends={updateFriends} updateFriendRequests={updateFriendRequests}/>
          :
          view == 'Suggested Friends' ?
          <SuggestedFriends SuggestedFriends={suggestedFriends} updateSuggestedFriends={updateSuggestedFriends} updateSentRequests={updateSentRequests}/>
          :
          <SentFriendRequests sentRequests={sentFriendRequests} updateSentRequests={updateSentRequests}/>
          }
      </div>
      <SendFriendRequest isShown={sendRequestVisisible} setIsShown={setSendRequestVisible} updateSentRequests={updateSentRequests}/>
    </>

  )
}

export default ManageFriends