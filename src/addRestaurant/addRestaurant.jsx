import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState } from 'react'
import { addRestaurant } from '/src/firebase.js'
import './addRestaurant.css'
import '/src/index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AddRestaurant />
  </React.StrictMode>,
)



function AddRestaurant() {
  
  async function handleAddRestaurant(e){
    const name = document.getElementById('name').value
    const description = document.getElementById('description').value
    const address = document.getElementById('address').value
    const city = document.getElementById('city').value
    const state = document.getElementById('state').value
    const website = document.getElementById('website').value
    const category = document.getElementById('category').value
    const price = document.getElementById('price').value
    const photo = document.getElementById('photo').value


    await addRestaurant(name, description,address, city, state, website, category, price, photo)

    //Redirect to home page
    window.location.href = '/'
  
  }

  function handleBackArrow(e){
    window.location.href = '/index.html'
  }


  return (
    <div className="AddRestaurant">
      <img src="src/assets/white_back_arrow.png" alt="back arrow" className='back' onClick={handleBackArrow}/>
      <h1>Add Restaurant</h1>
      
      <div className='Fields'>
         <label htmlFor="name">Restaurant Name: </label>
         <input type="text" id='name'/>
         <br />
         <label htmlFor="description">Restaurant Description: </label>
         <textarea name="description" id="description" cols="30" rows="5"></textarea>
         <br />
        <label htmlFor="address">Address: </label>
        <input type="text" id='address'/>
        <br />
        <label htmlFor="city">City: </label>
        <input type="text" id='city'/>
    
        <label htmlFor="state">State: </label>
        <select id='state'>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
        </select>
        <br />
        <label htmlFor="category">Restaraunt Category:</label>
        <select id='category'>
            <option value="American">American</option>
            <option value="Asian">Asian</option>
            <option value="Barbecue">Barbecue</option>
            <option value="Bakery">Bakery</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Cafe">Cafe</option>
            <option value="Chinese">Chinese</option>
            <option value="Fast Food">Fast Food</option>
            <option value="French">French</option>
            <option value="Greek">Greek</option>
            <option value="Indian">Indian</option>
            <option value="Italian">Italian</option>
            <option value="Japanese">Japanese</option>
            <option value="Mexican">Mexican</option>
            <option value="Pizza">Pizza</option>
            <option value="Seafood">Seafood</option>
            <option value="Southern">Southern</option>
            <option value="Spanish">Spanish</option>
            <option value="Thai">Thai</option>
            <option value="Vietnamese">Vietnamese</option>
        </select>
        <br />
        <label htmlFor="price">Price:</label>
        <select id='price'>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
        </select>
        <br />
        <label htmlFor="website">Website: </label>
        <input type="text" id='website'/>
        <br />
        <label htmlFor="photo">Restaurant Photo URL: </label>
        <input type="text" id='photo'/>
        <br />
        <br />
        <button id='addRestaraunt' onClick={handleAddRestaurant}>Add Restaraunt</button>


        

      </div>
      
    </div>
  )
}

export default AddRestaurant