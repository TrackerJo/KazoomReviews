import { useState } from 'react'
import { addReview } from '../firebase.js'
import './addReview.css'
import x from '../assets/x_circle_fill.png'

function AddReview({ isShown, setIsShown, restaurant, updateReviews, reviewsSeen}) {
    
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState('')

    function handleExit(e){
        setIsShown('hidden')
    }

    function handleRatingChange(e){
        setRating(e.target.value)
    }

    function handleReviewChange(e){
        setReview(e.target.value)
    }

    async function handleSubmitReview(e){
      await  addReview(restaurant, rating, review)
        updateReviews(reviewsSeen)
        setIsShown('hidden')
    }

    return (
    <div className="Prompt" id={isShown}>
       <img src={x} alt="exit prompt" className='exit' onClick={handleExit}/> 
       <h1>Add Review</h1>
        <label>Rating</label>
        <br />
        <input type="number" min="1" max="5" onChange={handleRatingChange}/> <label> out of 5</label>
        <br />
        <label>Review</label>
        <br />
        <textarea rows="4" cols="30" onChange={handleReviewChange}/>
        <br />

        <button onClick={handleSubmitReview}>Submit</button>

    </div>
    )
}

export default AddReview
