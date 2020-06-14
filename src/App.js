import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import HomePage from "./pages/homepage/homepage.component.jsx";
import ShopPage from "./pages/shop/shop.component.jsx";
import CheckoutPage from "./pages/checkout/checkout.component.jsx";
import Header from "./components/header/header.component.jsx";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

class App extends React.Component {
  // by default is null
  unsubscribeFromAuth = null;

  //unsubscribe changes to currentuser= user when component mounts
  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      //if userAuth not null, userRef is used to check db if there is any updates made in the database
      //the moment user ref instantiate, it will return a snapshot object
      //the snapshot object contains data related to the new registered user/ whichver current user that has logged in
      //using .data will return snapshot data that is actually stored in the sdatabase
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
      // if user logs out set the user to null
      else setCurrentUser(userAuth);
    });
  }
  // when component unmounts reset to null
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />

          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

//access to state this.props.currentUser
// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser,
// });

//a selector is used to memoize , so it wont rerender if another state not related to this is rerendered
const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
});

//setCurrentUser is an action, it gets the user object and calls the disptach function
// dispatch is a way for redux to know that whatever object passed into dispatch is going
//to be an action object passed to every reducer
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

//this is done to update the reducer value with SET_CURRENT_USER
export default connect(mapStateToProps, mapDispatchToProps)(App);
