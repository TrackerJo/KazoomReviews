import { useState, useEffect } from 'react'
import { editRestaurant } from '../firebase.js'
import './editRestaurant.css'
import x from '../assets/x_circle_fill.png'

function EditRestaurant({ isShown, setIsShown, restaurant, updateRestaurant,restaurantID}) {
    
    const [oldRestaurant, setOldRestaurant] = useState(restaurant)
    const [description, setDescription] = useState(restaurant.Description)
    const [address, setAddress] = useState(restaurant.Address)
    const [city, setCity] = useState(restaurant.City)
    const [state, setState] = useState(restaurant.State)
    const [price, setPrice] = useState(restaurant.Price)
    const [image, setImage] = useState(restaurant.Photo)
    const [category, setCategory] = useState(restaurant.Category)
    const [website, setWebsite] = useState(restaurant.Website)

    useEffect(() => {
        setDescription(restaurant.Description)
        setAddress(restaurant.Address)
        setCity(restaurant.City)
        setState(restaurant.State)
        setPrice(restaurant.Price)
        setImage(restaurant.Photo)
        setCategory(restaurant.Category)
        setWebsite(restaurant.Website)
    }
    , [restaurant])
    

    function handleExit(e){
        setIsShown('hidden')
    }

    function handleDescriptionChange(e){
        setDescription(e.target.value)
    }

    function handleAddressChange(e){
        setAddress(e.target.value)
    }

    function handleCityChange(e){
        setCity(e.target.value)
    }

    function handleStateChange(e){
        setState(e.target.value)
    }

    function handlePriceChange(e){
        setPrice(e.target.value)
    }

    function handlePhotoChange(e){
        setImage(e.target.value)
    }

    function handleCategoryChange(e){
        setCategory(e.target.value)
    }

    function handleWebsiteChange(e){
        setWebsite(e.target.value)
    }

    async function handleEditRestaurant(e){
        let newRestaurant = {
            Description: description,
            Address: address,
            City: city,
            State: state,
            Price: price,
            Photo: image,
            Category: category,
            Website: website,
            Owner: restaurant.Owner,
            Name: restaurant.Name
        }
      await  editRestaurant(newRestaurant, restaurantID)
        updateRestaurant(newRestaurant)
        setIsShown('hidden')
    }
    

    return (
    <div className="Prompt" id={isShown}>
       <img src={x} alt="exit prompt" className='exit' onClick={handleExit}/> 
       <h1>Edit Restaurant</h1>
        <label>Description</label>
        <textarea rows="4" cols="30" onChange={handleDescriptionChange} value={description}/> 
        <br />
        <label>Address: </label>
       
        <input onChange={handleAddressChange} defaultValue={address}/>
        <br />
        <label>City: </label>
        <input onChange={handleCityChange} defaultValue={city}/>
        <br />
        <label htmlFor="state">State: </label>
          <select id='state' onChange={handleStateChange} defaultValue={state}>
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
          <label htmlFor="category">Category: </label>
          <select id='category' onChange={handleCategoryChange} defaultValue={category}>
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
        <label>Photo URL: </label>
        <input onChange={handlePhotoChange} defaultValue={image}/>
        <br />
        <label>Website URL:</label>
        <input onChange={handleWebsiteChange} defaultValue={website}/>
        <br />
        <label>Price:</label>
        <select id='price' onChange={handlePriceChange} defaultValue={price}>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
          </select>
        <br />
        <button onClick={handleEditRestaurant}>Submit</button>

    </div>
    )
}

export default EditRestaurant
