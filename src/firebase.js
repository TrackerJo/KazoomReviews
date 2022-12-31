// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, updateDoc,collection, addDoc, doc, setDoc, query, getDoc, deleteDoc,onSnapshot, where, getDocs } from "firebase/firestore";
import {
    getAuth,reauthenticateWithCredential,EmailAuthProvider,updatePassword, signOut, createUserWithEmailAndPassword, setPersistence, onAuthStateChanged ,signInWithEmailAndPassword, browserSessionPersistence, updateProfile
} from "firebase/auth";
import { restaurantPreferences, baseRestaurantPreferences, baseFriendSettings, baseProfileSettings } from "./userSettings";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDASCYNvmoILXHtSDil_8nb4o7QQdLMw8w",
  authDomain: "friendsandfamilyreviews.firebaseapp.com",
  projectId: "friendsandfamilyreviews",
  storageBucket: "friendsandfamilyreviews.appspot.com",
  messagingSenderId: "182041696995",
  appId: "1:182041696995:web:fd5d1c2e06636167d583d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const auth = getAuth(app)
let loggedIn = -1;
let loggingIn = false

onAuthStateChanged(auth, user => {
    if (user) {
        console.log('user logged in: ', user);
        //Check if on login page
        if(window.location.href.includes("login.html") && !loggingIn){
            window.location.href = ""
        }
        loggedIn = 1;
       
       
        
        
    } else {
        console.log('user logged out');
        //Redirect to login page
        if(!window.location.href.includes("login") && !window.location.href.includes("friendLink")){
            window.location.href = "/friends-and-family-reviews/login/"
        }
        loggedIn = 0;
    }
})

export async function AddDoc_CustomID(collectionName,obj, name){
    var ref = doc(db, collectionName, name);

    await setDoc(
        ref, obj
        
    )
    .then(() => {
        alert("data added successfully")
    })
    .catch((error) => {
        alert("unsuccessful operation, error: " + error);
    })
}
  export async function createDoc(){
    try {
        const docRef = await addDoc(collection(db, "users"), {
          first: "Ada",
          last: "Lovelace",
          born: 1815
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
  }

  export async function createUser(full_name, email, password, onLogin){
    const auth = getAuth();
    loggingIn = true;
    alert("Emal: " + email + " Password: " + password)
    await createUserWithEmailAndPassword(auth,email, password)
    .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
            displayName: full_name
          }).then(() => {
            // Profile updated!
            AddDoc_CustomID("users", {Name: full_name, Email: email,  Preferences: baseRestaurantPreferences, FriendSettings: baseFriendSettings, ProfileSettings: baseProfileSettings},user.uid).then(() => {
                alert("Account Created Successfully" + auth.currentUser.displayName)
                onLogin();
                loggingIn = false;
            })
        
        
            
            
          }).catch((error) => {
            // An error occurred
            alert("Error when updating profile. Look in console for more info.")
            console.log("Recieved error: " + error.message + " with error code " + error.code + " when updating profile.")
          });
       
        
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Error when registering account. Look in console for more info.")
        console.log("Recieved error: " + errorMessage + " with error code " + errorCode + " when registering account.")
    });
    
}

export async function signIn(email, password, onLogin){
    const auth = getAuth();
    loggingIn = true;
    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("Signed in successfully")
        setPersistence(auth, browserSessionPersistence)
        .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        onLogin()
        loggingIn = false;
        return signInWithEmailAndPassword(auth, email, password);
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });
        
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Error when signing in. Look in console for more info.")
        console.log("Recieved error: " + errorMessage + " with error code " + errorCode + " when signing in.")
    });
}

export async function signOutUser(){
    const auth = getAuth();
    await signOut(auth).then(() => {
        // Sign-out successful.
        alert("Signed out successfully")
        
      }).catch((error) => {
        // An error happened.
        alert("Error when signing out. Look in console for more info.")
        console.log("Recieved error: " + error.message + " with error code " + error.code + " when signing out.")
      });
}

export async function addRestaurant(name, description,address, city, state, website, category, price, photo){
    const auth = getAuth();
    await addDoc(collection(db, "restaurants"), {
        Name: name,
        Description: description,
        Address: address,
        City: city,
        State: state,
        Website: website,
        Category: category,
        Price: price,
        Photo: photo,
        Owner: auth.currentUser.uid
    })
    .then(() => {
        alert("Restaurant added successfully")
    })
    .catch((error) => {
        alert("Error when adding restaurant. Look in console for more info.")
        console.log("Recieved error: " + error.message + " with error code " + error.code + " when adding restaraunt.")
    }
    )
}

export async function findRestaurantsByName(name){    
    const q = query(collection(db, "restaurants"), where("Name", "==", name))
    const querySnapshot = await getDocs(q); 
    let map = querySnapshot.docs.map(doc => doc.data());
    console.log(querySnapshot.docs.length)
    for (let index = 0; index < querySnapshot.docs.length; index++) {
        const doc = querySnapshot.docs[index];
        console.log(doc);
        map[index].id = doc.id;
        
        
    }
    return map;
}

export async function findRestaurantsByCategory(category){
    const q = query(collection(db, "restaurants"), where("Category", "==", category))
    const querySnapshot = await getDocs(q); 
    let map = querySnapshot.docs.map(doc => doc.data());
    console.log(querySnapshot.docs.length)
    for (let index = 0; index < querySnapshot.docs.length; index++) {
        const doc = querySnapshot.docs[index];
        console.log(doc);
        map[index].id = doc.id;
        
        
    }
    return map;
}

export async function findRestaurantsByPrice(price){
    const q = query(collection(db, "restaurants"), where("Price", "==", price))
    const querySnapshot = await getDocs(q); 
    let map = querySnapshot.docs.map(doc => doc.data());
    console.log(querySnapshot.docs.length)
    for (let index = 0; index < querySnapshot.docs.length; index++) {
        const doc = querySnapshot.docs[index];
        console.log(doc);
        map[index].id = doc.id;
        
        
    }
    return map;
}

export async function findRestaurantsByCity(city){
    const q = query(collection(db, "restaurants"), where("City", "==", city))
    const querySnapshot = await getDocs(q); 
    let map = querySnapshot.docs.map(doc => doc.data());
    console.log(querySnapshot.docs.length)
    for (let index = 0; index < querySnapshot.docs.length; index++) {
        const doc = querySnapshot.docs[index];
        console.log(doc);
        map[index].id = doc.id;
        
        
    }
    return map;
}

export async function findRestaurantsByState(state){
    const q = query(collection(db, "restaurants"), where("State", "==", state))
    const querySnapshot = await getDocs(q); 
    let map = querySnapshot.docs.map(doc => doc.data());
    console.log(querySnapshot.docs.length)
    for (let index = 0; index < querySnapshot.docs.length; index++) {
        const doc = querySnapshot.docs[index];
        console.log(doc);
        map[index].id = doc.id;
        
        
    }
    return map;
}

export async function getRestaurant(id){
    const docRef = doc(db, "restaurants", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        
        return docSnap.data();
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}

export async function getReviews(id, reviewsSeen, restaurantType){
    const restaurantDoc = doc(db, "restaurants", id)
    let map = [];
    console.log(reviewsSeen)
    if(reviewsSeen == 'everyone'){
        const querySnapshot = await getDocs(collection(restaurantDoc, "reviews"));
        map = querySnapshot.docs.map(doc => doc.data());
        for (let index = 0; index < querySnapshot.docs.length; index++) {
            const doc = querySnapshot.docs[index];
            
            map[index].id = doc.id;
            
            
        }
        
    } else if(reviewsSeen == 'friends'){
        const querySnapshot = await getDocs(collection(restaurantDoc, "reviews"));
        map = querySnapshot.docs.map(doc => doc.data());
        let indexsToRemove = [];
        //Check if user is friends with the user who wrote the review
        const auth = getAuth();
        //Get friends of user
        const friends = await getFriendsIDOfUser(auth.currentUser.uid);
        console.log(friends)
        if(friends.length == 0){
            map = [];
            return map;
        }
        friends.push(auth.currentUser.uid);
        for (let index = 0; index < querySnapshot.docs.length; index++) {
            const rDoc = querySnapshot.docs[index];
            
            map[index].id = rDoc.id;
            
            
           
            console.log(rDoc.data().Owner, index)
            //Check if the user who wrote the review is in the friends list
            if(!friends.includes(rDoc.data().Owner)){
                indexsToRemove.push(index);
            }

        }
        console.log(indexsToRemove,"indexsToRemove")
        //Remove the reviews that the user is not friends with
        for (let index = 0; index < indexsToRemove.length; index++) {
           
            map.splice(indexsToRemove[index], 1);
        }
    } else if(reviewsSeen == "similar preferences"){
        //Get all the reviews
        //Get people who have similar preferences
        //Get the reviews of the people who have similar preferences
        const querySnapshot = await getDocs(collection(restaurantDoc, "reviews"));
        map = querySnapshot.docs.map(doc => doc.data());
        let indexsToRemove = [];
        //Get user doc
        const userDoc = doc(db, "users", auth.currentUser.uid);
        const userDocSnap = await getDoc(userDoc);
        const user = userDocSnap.data();
        //Get people who have similar preferences
        
            restaurantType = restaurantPreferences[restaurantType];
        
        const similarUsers = await getPeopleWithSimilarPreferences(restaurantType, user.FriendSettings.minSimilarities);
        //loop through all the reviews
        for (let index = 0; index < querySnapshot.docs.length; index++) {
            const rDoc = querySnapshot.docs[index];
            
            map[index].id = rDoc.id;
            
            //Check if the user who wrote the review is in the friends list
            if(!similarUsers.includes(rDoc.data().Owner)){
                indexsToRemove.push(index);
            }
        }
        
        //Remove the reviews that the user is not similar with
        for (let index = 0; index < indexsToRemove.length; index++) {
                       
            map.splice(indexsToRemove[index], 1);
        }

       



    }


    console.log(map);
    return map;

}

export async function getFriendsIDOfUser(id){
    const userDoc = doc(db, "users", id)
    const querySnapshot = await getDocs(collection(userDoc, "friends"));
    let map = querySnapshot.docs.map(doc => doc.data());
    let ids = [];
    for (let index = 0; index < querySnapshot.docs.length; index++) {
        const doc = querySnapshot.docs[index];
        
        map[index].id = doc.id;
        ids.push(doc.data().uid);
        
    }

    return ids;
    
}

export async function getAverageRating(id, reviewsSeen, restaurantType){
    const restaurantDoc = doc(db, "restaurants", id)
    let length = 0;
    let sum = 0;
    if(reviewsSeen == 'everyone'){
        const querySnapshot = await getDocs(collection(restaurantDoc, "reviews"));
        let map = querySnapshot.docs.map(doc => doc.data());
        for (let index = 0; index < querySnapshot.docs.length; index++) {
            const doc = querySnapshot.docs[index];
            
            map[index].id = doc.id;
            sum += doc.data().Rating;
            length++;
            
        }
    }
    else if(reviewsSeen == 'friends'){
        const querySnapshot = await getDocs(collection(restaurantDoc, "reviews"));
        let map = querySnapshot.docs.map(doc => doc.data());
        let indexsToRemove = [];
        //Check if user is friends with the user who wrote the review
        const auth = getAuth();
        //Get friends of user
        const friends = await getFriendsIDOfUser(auth.currentUser.uid);
        console.log(friends)
        friends.push(auth.currentUser.uid);
        for (let index = 0; index < querySnapshot.docs.length; index++) {
                const rDoc = querySnapshot.docs[index];
                if(friends.includes(rDoc.data().Owner)){
                    sum += rDoc.data().Rating;
                    length++;
                
            }
        }
    }
    else if(reviewsSeen == "similar preferences"){
        //Get all the reviews
        //Get people who have similar preferences
        //Get the reviews of the people who have similar preferences
        const querySnapshot = await getDocs(collection(restaurantDoc, "reviews"));
        let map = querySnapshot.docs.map(doc => doc.data());
        let indexsToRemove = [];
        const userDoc = doc(db, "users", auth.currentUser.uid);
        const userDocSnap = await getDoc(userDoc);
        const user = userDocSnap.data();
        //Get people who have similar preferences
        restaurantType = restaurantPreferences[restaurantType];
        const similarUsers = await getPeopleWithSimilarPreferences(restaurantType, user.FriendSettings.minSimilarities);
        //loop through all the reviews
        for (let index = 0; index < querySnapshot.docs.length; index++) {
            const rDoc = querySnapshot.docs[index];
            //Check if the user who wrote the review is in the similar users list
            if(similarUsers.includes(rDoc.data().Owner)){
                sum += rDoc.data().Rating;
                length++;
            }
        }
    }


    
    return Math.round(sum/length);
}

export async function addReview(id,rating, review){
    //Check is user already has a review
    const auth = getAuth();
    const restaurantDoc = doc(db, "restaurants", id)
    const querySnapshot = await getDocs(collection(restaurantDoc, "reviews"));
    let map = querySnapshot.docs.map(doc => doc.data());
    for (let index = 0; index < querySnapshot.docs.length; index++) {
        const doc = querySnapshot.docs[index];
        
        map[index].id = doc.id;
        if(doc.data().Owner == auth.currentUser.uid){
            alert("You already have a review for this restaurant")
            return;
        }
        
    }
    //Add review
    const reviewDoc = doc(restaurantDoc, "reviews", auth.currentUser.uid)
    await setDoc(reviewDoc, {
        Rating: parseInt(rating),
        Description: review,
        Name: auth.currentUser.displayName,
        Owner: auth.currentUser.uid
    })
    .then(async () => {
        alert("Review added successfully")
        //Increase the number of reviews the user has written
        const userDoc = doc(db, "users", auth.currentUser.uid)
        const userDocSnap = await getDoc(userDoc);
        const user = userDocSnap.data();
        await updateDoc(userDoc, {
            ReviewsWritten: user.ReviewsWritten + 1
        })
        //Add the review to the users reviews
        const userReviewDoc = doc(userDoc, "reviews", id)
        await setDoc(userReviewDoc,
            {
                RestaurantID: id,
                Rating: parseInt(rating),
                Description: review,
                Name: auth.currentUser.displayName,
                Owner: auth.currentUser.uid
            }
        )
    })
    .catch((error) => {
        alert("Error when adding review. Look in console for more info.")
        console.log("Recieved error: " + error.message + " with error code " + error.code + " when adding review.")
    })
    

}


export async function generateFriendRequestLink(){
    //Get first part of url

   let baseUrl = window.location.href
   baseUrl = baseUrl.split('/friends-and-family-reviews/')[0]
    let link = baseUrl + "/friends-and-family-reviews/friendLink/?uid=" + getAuth().currentUser.uid;
    return link;
}

export async function getUserProfile(uid){
    const userDoc = doc(db, "users", uid)
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
        return docSnap.data();
    }
    else{
        return "User not found";
    }
}

export async function getCurrentUserProfile(){
    const userDoc = doc(db, "users", getAuth().currentUser.uid)
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
        return docSnap.data();
    }
    else{
        return "User not found";
    }
}

export async function checkLoginStatus(){
    return loggedIn;
}

export async function addFriend(uid){
    const auth = getAuth();
    const userDoc = doc(db, "users", auth.currentUser.uid)
    const friendDoc = doc(db, "users", uid)
    //Check if user is already friends with this person
    const querySnapshot = await getDocs(collection(userDoc, "friends"));
    let map = querySnapshot.docs.map(doc => doc.data());
    for (let index = 0; index < querySnapshot.docs.length; index++) {
        const doc = querySnapshot.docs[index];
        
        map[index].id = doc.id;
        if(doc.data().uid == uid){
            alert("You are already friends with this user")
            return;
        }
        
    }
    const userProfile = await getUserProfile(uid);
    //Add friend
    const newfriendDoc = doc(userDoc, "friends", uid)
    await setDoc(newfriendDoc, {
        Name: userProfile.Name,
        uid: uid
    })

    //Add user to friend's friend list
    const newUserDoc = doc(friendDoc, "friends", auth.currentUser.uid)
    await setDoc(newUserDoc, {
        Name: auth.currentUser.displayName,
        uid: auth.currentUser.uid
    })

    alert("Friend added successfully")
}

export async function getFriends(){
    const auth = getAuth();
    const userDoc = doc(db, "users", auth.currentUser.uid)
    const querySnapshot = await getDocs(collection(userDoc, "friends"));
    let map = querySnapshot.docs.map(doc => doc.data());
    for (let index = 0; index < querySnapshot.docs.length; index++) {
        const doc = querySnapshot.docs[index];
        
        map[index].id = doc.id;
        
    }
    return map;
}

export async function getFriendRequests(){
    const auth = getAuth();
    const userDoc = doc(db, "users", auth.currentUser.uid)
    const querySnapshot = await getDocs(collection(userDoc, "friendRequests"));
    let map = querySnapshot.docs.map(doc => doc.data());
    for (let index = 0; index < querySnapshot.docs.length; index++) {
        const doc = querySnapshot.docs[index];
        
        map[index].id = doc.id;
        
    }
    return map;
}

export async function getSentFriendRequests(){
    const auth = getAuth();
    const userDoc = doc(db, "users", auth.currentUser.uid)
    const querySnapshot = await getDocs(collection(userDoc, "sentFriendRequests"));
    let map = querySnapshot.docs.map(doc => doc.data());
    for (let index = 0; index < querySnapshot.docs.length; index++) {
        const doc = querySnapshot.docs[index];
        
        map[index].id = doc.id;
        
    }
    return map;
}

export async function getDocFromName(name){
    const q = query(collection(db, "users"), where("Name", "==", name))
    const querySnapshot = await getDocs(q); 
    let map = querySnapshot.docs.map(doc => doc.data());
    console.log(querySnapshot.docs.length)
    for (let index = 0; index < querySnapshot.docs.length; index++) {
        const doc = querySnapshot.docs[index];
        console.log(doc);
        map[index].id = doc.id;
        
        
    }
    if(querySnapshot.docs.length == 0){
       
        return false;
    }
    return map[0];
}

export async function sendFriendRequest(name){
    let Doc = await getDocFromName(name);
    console.log(Doc);
    if(Doc == false){
        alert("User not found")
        return;
    }
    name = Doc.id;
    const auth = getAuth();
    const userDoc = doc(db, "users", auth.currentUser.uid)
    const friendDoc = doc(db, "users", name)
    //Check if user is already friends with this person
    const querySnapshot = await getDocs(collection(userDoc, "friends"));
    let map = querySnapshot.docs.map(doc => doc.data());
    for (let index = 0; index < querySnapshot.docs.length; index++) {
        const doc = querySnapshot.docs[index];
        
        map[index].id = doc.id;
        if(doc.data().uid == name){
            alert("You are already friends with this user")
            return;
        }
        
    }
    //Check if user has already sent a friend request to this person
    const querySnapshot2 = await getDocs(collection(userDoc, "sentFriendRequests"));
    let map2 = querySnapshot2.docs.map(doc => doc.data());
    for (let index = 0; index < querySnapshot2.docs.length; index++) {
        const doc = querySnapshot2.docs[index];
        
        map2[index].id = doc.id;
        if(doc.data().uid == name){
            alert("You have already sent a friend request to this user")
            return;
        }
        
    }
    //Check if user has already received a friend request from this person
    const querySnapshot3 = await getDocs(collection(userDoc, "friendRequests"));
    let map3 = querySnapshot3.docs.map(doc => doc.data());
    for (let index = 0; index < querySnapshot3.docs.length; index++) {
        const doc = querySnapshot3.docs[index];
        
        map3[index].id = doc.id;
        if(doc.data().uid == name){
            alert("You have already received a friend request from this user")
            return;
        }
        
    }
   
    //Add friend request
    const newfriendRequestDoc = doc(userDoc, "sentFriendRequests", name)
    await setDoc(newfriendRequestDoc, {
        Name: Doc.Name,
        uid: name
    })
    //Add friend request to friend's friend request list
    const newfriendRequestDoc2 = doc(friendDoc, "friendRequests", auth.currentUser.uid)
    await setDoc(newfriendRequestDoc2, {
        Name: auth.currentUser.displayName,
        uid: auth.currentUser.uid
    })
    alert("Friend request sent successfully")
}

export async function removeSentFriendRequest(uid){
    const auth = getAuth();
    const userDoc = doc(db, "users", auth.currentUser.uid)
    const friendDoc = doc(db, "users", uid)
    //Remove friend request
    const friendRequestDoc = doc(userDoc, "sentFriendRequests", uid)
    await deleteDoc(friendRequestDoc)
    //Remove friend request from friend's friend request list
    const friendRequestDoc2 = doc(friendDoc, "friendRequests", auth.currentUser.uid)
    await deleteDoc(friendRequestDoc2)
    alert("Friend request removed successfully")
}

export async function rejectFriendRequest(uid){
    const auth = getAuth();
    const userDoc = doc(db, "users", auth.currentUser.uid)
    const friendDoc = doc(db, "users", uid)
    //Remove friend request
    const friendRequestDoc = doc(userDoc, "friendRequests", uid)
    await deleteDoc(friendRequestDoc)
    //Remove friend request from friend's friend request list
    const friendRequestDoc2 = doc(friendDoc, "sentFriendRequests", auth.currentUser.uid)
    await deleteDoc(friendRequestDoc2)
    alert("Friend request rejected successfully")
}

export async function acceptFriendRequest(uid){
    const auth = getAuth();
    const userDoc = doc(db, "users", auth.currentUser.uid)
    const friendDoc = doc(db, "users", uid)
    //Remove friend request
    const friendRequestDoc = doc(userDoc, "friendRequests", uid)
    await deleteDoc(friendRequestDoc)
    //Remove friend request from friend's friend request list
    const friendRequestDoc2 = doc(friendDoc, "sentFriendRequests", auth.currentUser.uid)
    await deleteDoc(friendRequestDoc2)
    //Add friend
    const newfriendDoc = doc(userDoc, "friends", uid)
    const docSnap = await getDoc(friendDoc)
    await setDoc(newfriendDoc, {
        Name: docSnap.data().Name,
        uid: uid
    })
    //Add friend to friend's friend list
    const newfriendDoc2 = doc(friendDoc, "friends", auth.currentUser.uid)
    await setDoc(newfriendDoc2, {
        Name: auth.currentUser.displayName,
        uid: auth.currentUser.uid
    })
    alert("Friend request accepted successfully")
}

export async function removeFriend(uid){
    const auth = getAuth();
    const userDoc = doc(db, "users", auth.currentUser.uid)
    const friendDoc = doc(db, "users", uid)
    //Remove friend
    const usersFriendsDoc = doc(userDoc, "friends", uid)
    await deleteDoc(usersFriendsDoc)
    //Remove friend from friend's friend list
    const friendFriendsDoc = doc(friendDoc, "friends", auth.currentUser.uid)
    await deleteDoc(friendFriendsDoc)
    alert("Friend removed successfully")
}

export async function getAuthID(){
    const auth = getAuth();
    return auth.currentUser.uid;
}

export async function editReview(restaraunt, reviewID, review){
    console.log("Restaurant", restaraunt)
    console.log("ReviewID", reviewID)
    console.log("Review", review)
    const restarauntDoc = doc(db, "restaurants", restaraunt)
    const reviewDoc = doc(restarauntDoc, "reviews", reviewID)
    await updateDoc(reviewDoc, {
        Description: review.Description,
        Rating: parseInt(review.Rating)
    })
    //Update review in user's reviews
    const auth = getAuth();
    const userDoc = doc(db, "users", auth.currentUser.uid)
    const userReviewDoc = doc(userDoc, "reviews", reviewID)
    await updateDoc(userReviewDoc, {
        Description: review.Description,
        Rating: parseInt(review.Rating)
    })
    alert("Review edited successfully")
}

export async function changeEmail(email){
    const auth = getAuth();
    await updateEmail(auth.currentUser, email)
    alert("Email changed successfully")
}

export async function updateProfileInfo(profile){
    const auth = getAuth();
    await updateProfile(auth.currentUser, {
        displayName: profile.Name
    })
    //Update profile in database
    const userDoc = doc(db, "users", auth.currentUser.uid)
    await updateDoc(userDoc, {
        Name: profile.Name,
        ProfileSettings: profile.ProfileSettings
    })
    alert("Profile updated successfully")

}

export async function reauthenticateUser(email, password){
    const auth = getAuth();
    const credential = EmailAuthProvider.credential(email, password);
    reauthenticateWithCredential(auth.currentUser, credential).then(() => {
        console.log("reauthenticated", email, password)
      }).catch((error) => {
        console.log("error", error)
      });
    
}

export async function changePassword(password){
    const auth = getAuth();
    await updatePassword(auth.currentUser, password)
    alert("Password changed successfully")
}

export async function updateUserPreferences(preferences){
    const auth = getAuth();
    const userDoc = doc(db, "users", auth.currentUser.uid)
    await updateDoc(userDoc, {
        Preferences: preferences
    })
    alert("Preferences updated successfully")
}

export async function getPeopleWithSimilarPreferences(preferenceTypes, minSimilarity){
    const usersSnapshot = await getDocs(collection(db, "users"));
    let users = usersSnapshot.docs.map(doc => doc.data());
    for (let index = 0; index < usersSnapshot.docs.length; index++) {
        const doc = usersSnapshot.docs[index];
        
        users[index].uid = doc.id;
       
        
    }
    let similarUsers = [];
    const auth = getAuth();
    const userProfile = await getUserProfile(auth.currentUser.uid);
    console.log(userProfile)
    for(let i = 0; i < users.length; i++){
        if(users[i].uid == auth.currentUser.uid){
            continue;
        }
        let personsPreferences = users[i].Preferences;
        console.log(personsPreferences)
        for (let index = 0; index < preferenceTypes.length; index++) {
            const preferenceType = preferenceTypes[index];
            //Get num of keys in user's preferences
            let numOfKeys = Object.keys(userProfile.Preferences[preferenceType]).length;
            for (let index = 0; index < numOfKeys; index++) {
               
                const currentPreference = Object.keys(userProfile.Preferences[preferenceType])[index];
                const usersPreference = userProfile.Preferences[preferenceType][currentPreference];
                const similarUsersPreference = personsPreferences[preferenceType][currentPreference];
                if(usersPreference == similarUsersPreference){
                    similarUsers.push(users[i].uid);
                } 
            }


            
        }
    }
    //Count num of times each name appears in array
    similarUsers.forEach(name => {
        console.log(name, getOccurrence(similarUsers, name))
        
    });
    //Filter out names that appear less than minSimilarity times
    let filteredUsers = similarUsers.filter((name, index) => {
        return getOccurrence(similarUsers, name) >= minSimilarity;
    }
    )

    //Remove duplicates
    filteredUsers = [...new Set(filteredUsers)]


   
    console.log(filteredUsers)
    return filteredUsers;

}

function getOccurrence(array, value) {
    return array.filter((v) => (v === value)).length;
}

export async function updateFriendSettings(friendSettings){
    const auth = getAuth();
    const userDoc = doc(db, "users", auth.currentUser.uid)
    await updateDoc(userDoc, {
        FriendSettings: friendSettings
    })
    alert("Friend settings updated successfully")
}

export async function checkIfRestaurantIsFavorited(restaurant){
    const auth = getAuth();
    const userDoc = doc(db, "users", auth.currentUser.uid)
    const restaurantDoc = doc(userDoc, "favorites", restaurant)
    const docSnap = await getDoc(restaurantDoc)
    if(docSnap.exists()){
        return true;
    }
    return false;
}

export async function addRestaurantToFavorites(restaurant){
    const auth = getAuth();
    const userDoc = doc(db, "users", auth.currentUser.uid)
    const restaurantDoc = doc(userDoc, "favorites", restaurant)
    await setDoc(restaurantDoc, {
        id: restaurant
    })
    alert("Restaurant added to favorites successfully")
}

export async function removeRestaurantFromFavorites(restaurant){
    const auth = getAuth();
    const userDoc = doc(db, "users", auth.currentUser.uid)
    const restaurantDoc = doc(userDoc, "favorites", restaurant)
    await deleteDoc(restaurantDoc)
    alert("Restaurant removed from favorites successfully")
}

export async function getRestaurantByID(id){
    const restaurantDoc = doc(db, "restaurants", id)
    const docSnap = await getDoc(restaurantDoc)
    if(docSnap.exists()){
        return docSnap.data();
    }
    return null;
}

export async function getFavoriteRestaurants(){
    const auth = getAuth();
    const userDoc = doc(db, "users", auth.currentUser.uid)
    const favoritesSnapshot = await getDocs(collection(userDoc, "favorites"))
    let favorites = favoritesSnapshot.docs.map(doc => doc.data());
    for (let index = 0; index < favoritesSnapshot.docs.length; index++) {
        const doc = favoritesSnapshot.docs[index];
        let restaurant = await getRestaurantByID(doc.id)
        favorites[index].Name = restaurant.Name;
        favorites[index].Price = restaurant.Price;
    }
    return favorites;
}

export async function getAverageRatingGivenByUser(uid){
    //Get all reviews written by user
    const userDoc = doc(db, "users", uid)
    const reviewsSnapshot = await getDocs(collection(userDoc, "reviews"))
    let reviews = reviewsSnapshot.docs.map(doc => doc.data());
    let totalRating = 0;
    for (let index = 0; index < reviews.length; index++) {
        const review = reviews[index];
        totalRating += review.Rating;
    }
    //Round avegerage to in
    let averageRating = Math.round(totalRating / reviews.length);
    return averageRating;
}

export async function getUsersReviews(uid){
    const userDoc = doc(db, "users", uid)
    const reviewsSnapshot = await getDocs(collection(userDoc, "reviews"))
    let reviews = reviewsSnapshot.docs.map(doc => doc.data());
    for (let index = 0; index < reviewsSnapshot.docs.length; index++) {
        const doc = reviewsSnapshot.docs[index];
        let restaurant = await getRestaurantByID(doc.id)
        reviews[index].Name = restaurant.Name;
        reviews[index].Price = restaurant.Price;
    }
    return reviews;
}