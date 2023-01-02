import { useState } from 'react'
import { signIn } from './firebase.js'
import './restaurantLabel.css'
import { getBase } from "/webSettings.js";

function RestaurantLabel({restaurant}) {
 

    function handleClick(e){
        window.location.href = getBase() + "viewRestaurant/?restaurant=" + restaurant.id
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
