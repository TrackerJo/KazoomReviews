import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState, useEffect } from 'react'
import { getUserProfile, getAverageRatingGivenByUser, getFavoriteRestaurants,getUsersReviews } from '/src/firebase.js'
import './viewUserProfile.css'
import '/src/index.css'
import RestaurantLabel from '/src/restaurantLabel'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ViewUserProfile />
  </React.StrictMode>,
)



function ViewUserProfile() {
  
    const [user, setUser] = useState([])
    const [averageRating, setAverageRating] = useState(0)
    const [reviewsGiven, setReviewsGiven] = useState([])
    const [favoriteRestaurants, setFavoriteRestaurants] = useState([])
    //Get user id from url parameter
    const urlParams = new URLSearchParams(window.location.search)
    const userId = urlParams.get('user')
  useEffect(() => {
    function load(){
        getUserProfile(userId).then((user) => {
            setUser(user)
        })

        getAverageRatingGivenByUser(userId).then((rating) => {
            setAverageRating(rating)
        })

        getFavoriteRestaurants(userId).then((restaurants) => {
            setFavoriteRestaurants(restaurants)
        })

        getUsersReviews(userId).then((reviews) => {
            setReviewsGiven(reviews)
        })
    }

    //Delay load
    setTimeout(load, 1000)
   
    
  }, [])

 


  function handleBackArrow(e){
    window.location.href = '/index.html'
  }
  

  return (
    <div className="UserProfile">
        <div className='Info'>
            <img src="src/assets/white_back_arrow.png" alt="back arrow" className='back' onClick={handleBackArrow}/><h1 className='name'>{user.Name}'s Profile</h1>
            <label>{user.ReviewsWritten} Reviews Written</label>
            <br />
            <label>Average Rating: {averageRating}</label>
            <div className='RestaurantInfo'>
                <div className='FavoriteRestaurants'>
                    <h1>Favorite Restaurants</h1>
                    <div className='restaurants'>
                        {favoriteRestaurants.map((restaurant) => (
                            
                            <RestaurantLabel key={restaurant.id} restaurant={restaurant} />
                            ))}
                    </div>

                </div>
                <div className='ReviewsGiven'>
                    <h1>Reviews Given</h1>
                    <div className='reviews'>
                        {reviewsGiven.map((review) => (
                            console.log(review),
                            <div className='review' key={review.RestaurantID}>
                                <label>{review.Name}</label>
                                <br />
                                <label>{"★".repeat(review.Rating)}{ "☆".repeat(5-review.Rating)}</label>
                                <br />
                                <label>{review.Description}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

       </div>

    </div>
  )
}

export default ViewUserProfile