import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState, useEffect } from 'react'
import { getRestaurant, getReviews, getAverageRating, checkIfRestaurantIsFavorited, addRestaurantToFavorites, removeRestaurantFromFavorites } from '../firebase.js'
import './viewRestaurant.css'
import '../index.css'
import Review from './Review'
import Reviews from './Reviews'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ViewRestaurant />
  </React.StrictMode>,
)



function ViewRestaurant() {
  
  const [restaurant, setRestaurant] = useState([])
  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState(0)
  const [visibility, setVisibility] = useState('hidden')
  const [reviewsSeen, setReviewsSeen] = useState('everyone')
  const [isFavorited, setIsFavorited] = useState(false)
  const [favoritedImg, setFavoritedImg] = useState('/assets/white_star_empty.png')
   //get restaurant name from url parameter
   const urlParams = new URLSearchParams(window.location.search)
   const restaurantName = urlParams.get('restaurant')
  useEffect(() => {
   
    getRestaurant(restaurantName).then((restaurant) => {
      setRestaurant(restaurant)
      getReviews(restaurantName, reviewsSeen, restaurant.Category).then((reviews) => {
        setReviews(reviews)
        console.log(reviews)
        
      })
      getAverageRating(restaurantName, reviewsSeen, restaurant.Category).then((rating) => {
        setRating(rating)
      })
      checkIfRestaurantIsFavorited(restaurantName).then((favorite) => {
        if(favorite){
          setIsFavorited(true)
          setFavoritedImg('/assets/white_star_fill.png')
        }
      })
    })

    

   


    
  }, [])

  async function updateReviews(rSeen){
    console.log('updating reviews')
    setReviewsSeen(rSeen)
    console.log(reviewsSeen)
    getReviews(restaurantName, rSeen, restaurant.Category).then((reviews) => {
      setReviews(reviews)
      
      
    })

    getAverageRating(restaurantName, rSeen, restaurant.Category).then((rating) => {
      setRating(rating)
    })
    
  }

  function handleViewReviews(e) {
    const reviewsDiv = document.querySelector('.Reviews')
    if(reviewsDiv.classList.contains('hideReviews')){
        reviewsDiv.classList.remove('hideReviews')
        reviewsDiv.classList.add('showAnimReviews')
        e.target.innerText = 'Hide Reviews'
    } else if(reviewsDiv.classList.contains('showAnimReviews')){
        reviewsDiv.classList.add('hideAnimReviews')
        reviewsDiv.classList.remove('showAnimReviews')
        e.target.innerText = 'View Reviews'
    }else if(reviewsDiv.classList.contains('hiddenReviews')){
        reviewsDiv.classList.remove('hiddenReviews')
        reviewsDiv.classList.add('showAnimReviews')
        e.target.innerText = 'Hide Reviews'
    }
  }

  function animationEnded(){
    const reviewsDiv = document.querySelector('.Reviews')
    if(reviewsDiv.classList.contains('hideAnimReviews')){
      reviewsDiv.classList.add('hideReviews')
      reviewsDiv.classList.remove('hideAnimReviews')
    }
  }

  function handleBackArrow(e){
    window.location.href = '/friends-and-family-reviews/'
  }
  
  async function handleFavoriteRestaurant(e){
    if(isFavorited){
      setIsFavorited(false)
      setFavoritedImg('/assets/white_star_empty.png')
      await removeRestaurantFromFavorites(restaurantName)
    }else{
      setIsFavorited(true)
      setFavoritedImg('/assets/white_star_fill.png')
      await addRestaurantToFavorites(restaurantName)
    }
  }

  return (
    <div className="Restaurant">
      <div className='Info'>
        <br />
        <img src="./assets/white_back_arrow.png" alt="back arrow" className='back' onClick={handleBackArrow}/><label className='name'>{restaurant.Name}</label><img src={favoritedImg} alt="favorite restaurant" id="favorite" onClick={handleFavoriteRestaurant}/> <label className='price'>{"$".repeat(restaurant.Price)}</label>
    
        <table className='photoLoc'>
          <tr>
            <th>
              <p>{restaurant.Description}</p>
              <a href={restaurant.Website}>{restaurant.Name}'s Website</a>
              <br />
              <label>{restaurant.Address}</label>
              <br />
              <label>{restaurant.City}</label>
              <br />
              <label>{restaurant.State}</label>
            </th>

            <th>
              <img src={restaurant.Photo} className='photo'></img>
            </th>
          </tr>
        </table>
        <label>Category: {restaurant.Category}</label>
        <br />
        <label>Rating ({reviewsSeen})</label>
        <br />
        <label className='aRating'>{"★".repeat(rating)}{ "☆".repeat(5-rating)}</label>
        <br />
        <button onClick={handleViewReviews}>View Reviews</button>
        
      </div>
      <div className='Reviews hiddenReviews' onAnimationEnd={animationEnded}>
        <Reviews reviews={reviews} restaurant={restaurantName} updateReviews={updateReviews} reviewsSeen={reviewsSeen} setReviewsSeen={setReviewsSeen}/>
      </div>
    </div>
  )
}

export default ViewRestaurant