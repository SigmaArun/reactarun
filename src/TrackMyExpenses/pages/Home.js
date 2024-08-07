import React, { useState,useEffect,useContext } from "react";
import { Container ,Button} from "react-bootstrap";
import AuthContext from "../store/AuthContext";
import './Home.css';

import Profile from "../components/Profile";
import ExpenseForm from "./ExpenseForm";


const Home=()=>{
  const authCtx=useContext(AuthContext);
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
          <div>
         <h2>Welcome to Expenese Tracker App</h2>
         </div>

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
      <div className="expenses">
        {authCtx.isLoggedIn && <ExpenseForm></ExpenseForm>}
      </div>
       
         </Container>
       </>
    )
}
export default Home;