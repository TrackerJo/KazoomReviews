import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { getAuthID } from '../firebase.js'
import './Review.css'
import EditReview from './editReview'
import pencil from '../assets/pencil.png'

function Review({review, updateReviews, restaurant, reviewsSeen}) {
    
    const [isOwner, setIsOwner] = useState(false)
    const [isEditShown, setIsEditShown] = useState('hidden')


    useEffect(() => {
        getAuthID().then((authID) => {
            
            if (authID == review.Owner){
                setIsOwner(true)
            }
        })
    }, [])
    

    return (
        <>
            <div className="reviewBox" >
                {isOwner ?
                <img src={pencil} alt="edit review" className='edit' onClick={() => setIsEditShown('visible')}/>
                
                : null}
                <label className='rName'>{review.Name}</label>
                <label className='rRating'>{"★".repeat(review.Rating)}{ "☆".repeat(5-review.Rating)}</label>
                <div className='review'>
                    <p>{review.Description}</p>
                </div>
            </div>
            {
                createPortal(<EditReview isShown={isEditShown} setIsShown={setIsEditShown} restaurant={restaurant} updateReviews={updateReviews} oldReview={review} reviewsSeen={reviewsSeen}/>, document.querySelector('.Reviews'))
            }
        </>
    )
}

export default Review
