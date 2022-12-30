import { useState } from 'react'
import { signIn } from '/src/firebase.js'
import './restaurantLabel.css'

function RestaurantLabel({restaurant}) {
 

    function handleClick(e){
        window.location.href = "/viewRestaurant.html?restaurant=" + restaurant.id
    }
  
  return (
    <div className="restaurantLabel" onClick={handleClick}>
        <span className='labelSpacer'>
            <label className='rName'>{restaurant.Name}</label>
            
            <label className='rPrice'>{"$".repeat(restaurant.Price)}</label>
        </span>
      
    </div>
  )
}

export default RestaurantLabel
