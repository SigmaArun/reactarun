import React, { useState,useEffect } from "react";
import { Container ,Button} from "react-bootstrap";
import './Home.css';

import Profile from "../components/Profile";


const Home=()=>{
  const[showProfile,setShowProfile]= useState(false);
  const[showMessage,setShowMessage]= useState(false);

  // so that profile always show 80% complete once update 
  useEffect(() => {
   
    const storedShowMessage = localStorage.getItem("showMessage");
    if (storedShowMessage === "true") {
      setShowMessage(true);
    }
  }, []);

  const profileHandler=()=>{
  
     setShowProfile(true);

  }

  const showProfilehandler=()=>{
   setShowProfile(false);
  }
  const profileUpdateHandler = () => {
   setShowProfile(false);
   setShowMessage(true);
   localStorage.setItem("showMessage", "true");
 };
    
    return(
       <>
       <Container >
        <div className="outerdiv">
         <h2>Welcome to Expenese Tracker App</h2>

         <div className="profile">
               
         {!showMessage ? (
              <div>
                <p>Your Profile is incomplete</p>
              </div>
            ) : (
              <div>
                <p style={{ color: "green" }}>Your profile is 80% completed</p>
              </div>
            )}
         </div>

         <div className="button">
          <Button onClick={profileHandler} variant="secondary" >complete now</Button>
         </div>

         <div>
            { showProfile &&
               <Profile show ={showProfilehandler}  onProfileUpdate={profileUpdateHandler}></Profile>
           }        
           </div>
      </div>
       
         </Container>
       </>
    )
}
export default Home;