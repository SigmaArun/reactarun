import React, { useState } from "react";
import { Container ,Button} from "react-bootstrap";
import './Home.css';

import Profile from "../components/Profile";


const Home=()=>{
  const[showProfile,setShowProfile]= useState(false);
  const[showMessage,setShowMessage]= useState(false);

  const profileHandler=()=>{
  
     setShowProfile(true);

  }

  const showProfilehandler=()=>{
   setShowProfile(false);
  }
  const profileUpdateHandler = () => {
   setShowProfile(false);
   setShowMessage(true);
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