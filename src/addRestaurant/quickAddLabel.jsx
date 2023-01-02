import { useState } from 'react'
import { addRestaurant } from '../firebase.js'
import './quickAddLabel.css'
import { getBase } from "/webSettings.js";

function QuickAddLabel({restaurant, setQuickAddVisibile, updateFields}) {
 

    async function handleClick(e){
        let price = Array.from(restaurant.price).length
        console.log(price, restaurant.price,"PRICE")
        let filledRestaurant = {name: restaurant.name, address: restaurant.location.display_address[0], city: restaurant.location.city, state: restaurant.location.state, price: price, photo: restaurant.image_url}
        updateFields(filledRestaurant)
        setQuickAddVisibile('hidden')
       
        
    }       
  
  return (
    <div className="restaurantLabel" onClick={handleClick}>
        <span className='labelSpacer'>
            <b className='rName'>{restaurant.name}</b>
            <br />
            <label className='rLoc'>{restaurant.location.display_address[0]},{restaurant.location.display_address[1]}</label>
        </span>
      
    </div>
  )
}

export default QuickAddLabel
