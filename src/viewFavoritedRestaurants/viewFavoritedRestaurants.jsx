import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState, useEffect } from 'react'
import { getFavoriteRestaurants } from '../firebase.js'
import './viewFavoritedRestaurants.css'
import '../index.css'
import RestaurantLabel from '../restaurantLabel'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ViewFavoritedRestaurants />
  </React.StrictMode>,
)



function ViewFavoritedRestaurants() {
  
    const [favoriteRestaurants, setFavoriteRestaurants] = useState([])
  useEffect(() => {
    function load(){
        getFavoriteRestaurants().then((restaurants) => {
        setFavoriteRestaurants(restaurants)
        })
    }

    //Delay load
    setTimeout(load, 1000)
   
    
  }, [])

 


  function handleBackArrow(e){
    window.location.href = '/friends-and-family-reviews/'
  }
  

  return (
    <div className="FavoriteRestaurants">
       <img src="./assets/white_back_arrow.png" alt="back arrow" className='back' onClick={handleBackArrow}/><h1 className='name'>Favorite Restaurants</h1>
        <div className='restaurants'>
        {favoriteRestaurants.map((restaurant) => (
         console.log(restaurant),
         <RestaurantLabel key={restaurant.id} restaurant={restaurant} />
            ))}
        </div>

    </div>
  )
}

export default ViewFavoritedRestaurants