import { useState } from 'react'
import { getYelpRestaurants } from '../firebase.js'
import './quickAddRestaurant.css'
import x from '../assets/x_circle_fill.png'
import QuickAddLabel from './quickAddLabel'

function QuickAddRestaurant({ isShown, setIsShown, updateFields}) {
    
    const [name, setName] = useState("")
    const [location, setLocation] = useState(null)
    const [restaurants, setRestaurants] = useState([])
    const [view, setView] = useState('prompt')
 

    function handleExit(e){
        
        setIsShown('hidden')
        setView('prompt')
    }

    function handleNameChange(e){
        setName(e.target.value)
    }

    function handleLocationChange(e){
        setLocation(e.target.value)
    }

   

    async function handleFindRestaurant(e){
      let restaurants = await getYelpRestaurants(name, location)
      console.log(restaurants, "YELP RESTAURANTS")
      setView('results')
      setRestaurants(restaurants)
      
    }

    return (
        <>
        {view == 'prompt' ?
            <div className="Prompt" id={isShown}>
                <img src={x} alt="exit prompt" className='exit' onClick={handleExit}/> 
                <h1>Quick Add Restaurant</h1>
                    
                    <div className='PromptInfo'>
                    <label>Restaurant's Name</label>
                    <br />
                    <input type="text" id="name" onChange={handleNameChange}/>
                    <br />
                    <label>Location (City, State) (Optional)</label>
                    <br />
                    <input type="text" id="location" onChange={handleLocationChange}/>
                    <br />
                    <button onClick={handleFindRestaurant}>Find Restaurant</button>
                    </div>
            </div>
        :
            <div className="Results" id={isShown}>
                <img src={x} alt="exit prompt" className='exit' onClick={handleExit}/>
                <h1>Results</h1>
                <div className='ResultsHolder'>
                    <div className='ResultsInfo'>
                        {restaurants.map((restaurant) => (
                            <QuickAddLabel key={restaurant.id} restaurant={restaurant} setQuickAddVisibile={setIsShown} updateFields={updateFields}/>
                        ))}
                    </div>
                </div>

            </div>
        }
        </>
    )
}

export default QuickAddRestaurant
