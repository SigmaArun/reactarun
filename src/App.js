// real App js
//import './App.css';
import { Container } from "react-bootstrap";
import React, { useContext, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";  

import CartProvider from "./ecommerceWebsite/store/CartProvider";
import About from "./ecommerceWebsite/pages/About";
import Store from "./ecommerceWebsite/pages/Store";
import Header from "./ecommerceWebsite/components/Header";
import Footer from "./ecommerceWebsite/components/Footer";
import Home from "./ecommerceWebsite/pages/Home";
import Contact from "./ecommerceWebsite/pages/Contact";

import SignUpForm from "./ecommerceWebsite/pages/SignUpForm";
import LoginForm from "./ecommerceWebsite/pages/LoginForm";
import ProductDetails from "./ecommerceWebsite/pages/ProductsDetails";
import AuthProvider from "./ecommerceWebsite/store/AuthProvider";

import AuthContext from "./ecommerceWebsite/store/AuthContext";



const ProfileForm = lazy(() => import("./ecommerceWebsite/pages/ProfileForm"));
const Cart = lazy(() => import("./ecommerceWebsite/components/Cart"));

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

const App = () => {
  // it should use inside app
  // const authCtx = useContext(AuthContext);
  // const cartCtx = useContext(CartContext);
 
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Container fluid className="p-0">
              <Header />
              <Switch>
              <Redirect exact from="/" to="/home" />
              <Route exact path="/home" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/store/products/:productId" component={ProductDetails} />
                <PrivateRoute path="/store" exact component={Store} />
                <Route path="/contact" component={Contact} />
                <Route path="/signup" component={SignUpForm} />
                <Route path="/login" component={LoginForm} />
              
                <Suspense fallback={<p>Loading...</p>}>
                
                  <PrivateRoute path="/profile" component={ProfileForm} />
                </Suspense>
               
                <Route render={() => <Redirect to="/home" />} />
              
              </Switch>
             
              <Footer />
              <Suspense fallback={<p>Loading...</p>}>
                <Cart /> 
              </Suspense>
            </Container>
          </Router>
        </CartProvider>
      </AuthProvider>
    </>
  );
};

export default App;

