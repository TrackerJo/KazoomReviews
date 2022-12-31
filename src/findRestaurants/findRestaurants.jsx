import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState } from 'react'
import { findRestaurantsByName, findRestaurantsByState, findRestaurantsByCity, findRestaurantsByPrice, findRestaurantsByCategory } from '../firebase.js'
import './findRestaurants.css'
import '../index.css'
import SearchBar from './searchBar'
import RestaurantLabel from '../restaurantLabel'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FindRestaurants />
  </React.StrictMode>,
)



function FindRestaurants() {
  
  const [searchType, setSearchType] = useState('name')
  const [restaurants, setRestaurants] = useState([])

  function handleSearchByChange(e){
    setSearchType(e.target.value)
  }

  function handleSearch(e){
    //Remove find restaurants div
    document.querySelector('.FindRestaurants').style.display = 'none'
    //Show results div
    document.querySelector('.Results').style.display = 'flex'
    
    //Check searchType and call appropriate function
    if(searchType == 'name'){
      findRestaurantsByName(document.getElementById('search').value).then((restaurants) => {
        setRestaurants(restaurants)
      })
    } else if(searchType == 'city'){
      findRestaurantsByCity(document.getElementById('search').value).then((restaurants) => {
        setRestaurants(restaurants)
      })
    } else if(searchType == 'state'){
      findRestaurantsByState(document.getElementById('search').value).then((restaurants) => {
        setRestaurants(restaurants)
      })
    } else if(searchType == 'category'){
      findRestaurantsByCategory(document.getElementById('search').value).then((restaurants) => {
        setRestaurants(restaurants)
      })
    } else if(searchType == 'price'){
      findRestaurantsByPrice(document.getElementById('search').value).then((restaurants) => {
        setRestaurants(restaurants)
      })
    }

  }

  function handleBackArrow(e){
    window.location.href = '/friends-and-family-reviews/'
  }

  return (
    <>
    <div className="FindRestaurants">
       <h1>Search for Restaurants</h1>
      <label htmlFor="searchBy">Search By: </label>
      <select id='searchBy' onChange={handleSearchByChange}>
        <option value="name">Name</option>
        <option value="city">City</option>
        <option value="state">State</option>
        <option value="category">Category</option>
        <option value="price">Price</option>
      </select>
      <SearchBar searchType={searchType} /> 
      <button onClick={handleSearch}>Search</button>
     
    </div>
     <div className='Results' style={{display:"none"}}>
      <h1>Search Results</h1>
     {restaurants.map((restaurant) => (
         console.log(restaurant),
         <RestaurantLabel key={restaurant.id} restaurant={restaurant} />
     ))}
  </div>
  </>
  )
}

export default FindRestaurants