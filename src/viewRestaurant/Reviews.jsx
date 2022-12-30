import { useState, useEffect } from 'react'
import { getAuthID } from '/src/firebase.js'
import './Reviews.css'
import Review from './Review'
import AddReview from './addReview'


function Reviews({reviews, restaurant, updateReviews, reviewsSeen, setReviewsSeen}) {
    const [isShown, setIsShown] = useState('hidden')
    
   
    

    function handleAddReview(e){
        setIsShown('visible')
    }

    async function handleReviewsSeen(e){
        
        updateReviews(e.target.value)
    }

    return (
        <>
            
            <br />
            <label className='title'>Reviews</label> <img className="add" src="src/assets/plus_fill_white.png" alt="add review" onClick={handleAddReview}/>
            <br />
            <label htmlFor="reviewsSeen">Reviews Shown: </label> 
            <select name="reviewsSeen" id="reviewsSeen" onChange={handleReviewsSeen}>
                <option value="everyone" >Everyone</option>
                <option value="friends" >Friends</option>
                <option value="similar preferences" >People with similar preferences</option>
            </select>
            <br />
            <br />
             <div className="reviewsBox">
                <div className='reviews'>
                    {reviews.map((review) => {
                      
                        return (
                            <Review key={review.id} review={review} updateReviews={updateReviews} restaurant={restaurant} reviewsSeen={reviewsSeen}/>
                        )
                    })}
                            
                </div>
            </div>
            <AddReview isShown={isShown} setIsShown={setIsShown} restaurant={restaurant} updateReviews={updateReviews} reviewsSeen={reviewsSeen}/>
        </>
    )
}

export default Reviews
