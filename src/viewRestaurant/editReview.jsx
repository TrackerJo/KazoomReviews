import { useState } from 'react'
import { editReview } from '../firebase.js'
import './addReview.css'
import x from '../assets/x_circle_fill.png'

function EditReview({ isShown, setIsShown, restaurant, updateReviews, oldReview, reviewsSeen}) {
    
    
    const [review, setReview] = useState(oldReview)

    function handleExit(e){
        setIsShown('hidden')
    }

    function handleRatingChange(e){

        setReview({...review, Rating: e.target.value})
    }

    function handleReviewChange(e){
        setReview({...review, Description: e.target.value})
    }

    async function handleSubmitReview(e){
      await  editReview(restaurant, oldReview.Owner, review)
        updateReviews(reviewsSeen)
        setIsShown('hidden')
    }

    return (
    <div className="Prompt" id={isShown}>
       <img src={x} alt="exit prompt" className='exit' onClick={handleExit}/> 
       <h1>Edit Review</h1>
        <label>Rating</label>
        <br />
        <input type="number" min="1" max="5" onChange={handleRatingChange} defaultValue={review.Rating}/> <label> out of 5</label>
        <br />
        <label>Review</label>
        <br />
        <textarea rows="4" cols="30" onChange={handleReviewChange} defaultValue={review.Description}/>
        <br />

        <button onClick={handleSubmitReview}>Submit</button>

    </div>
    )
}

export default EditReview
