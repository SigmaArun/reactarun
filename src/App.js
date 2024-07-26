import React,{useContext} from "react";
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
import VerifyEmail from "./TrackMyExpenses/pages/VerifyEmail";
import AuthContext from "./TrackMyExpenses/store/AuthContext";

// i love this concept 
const PrivateRoute = ({ component: Component, ...rest }) => {
  const authCtx = useContext(AuthContext);
 
 
  return ( 
    <Route
      {...rest}
      render={(props) =>
        authCtx.isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
const App =()=> {


  return (
     
     <>    <AuthProvider>
           
             <Router>
             
             <Container fluid className="p-0" style={{ marginTop: "56px" }}>
            <Header></Header>
              <Switch>
              <Redirect exact from="/" to="/home" />
              <PrivateRoute path="/verifyemail"  component={VerifyEmail} />
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
