import React from "react";
import SignUp from "./TrackMyExpenses/pages/SignUp";
import { Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./TrackMyExpenses/pages/Home";
import AuthProvider from "./TrackMyExpenses/store/AuthProvider";
import Login from "./TrackMyExpenses/pages/Login";
import Header from "./TrackMyExpenses/components/Header";


const App =()=> {


  return (
     
     <>    <AuthProvider>
           
             <Router>
             
             <Container fluid className="p-0" style={{ marginTop: "56px" }}>
            <Header></Header>
              <Switch>
              <Redirect exact from="/" to="/home" />
               <Route path='/home' component={Home}/>
               <Route path="/signup"  component={SignUp}/>
               <Route path="/login" component={Login} />
               </Switch>
            </Container>
          </Router>
          </AuthProvider>
     </>
      
       
  );
}

export default App;
