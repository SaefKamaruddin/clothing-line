import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { auth } from "../../firebase/firebase.utils";

import { ReactComponent as Logo } from "../../assets/crown.svg";

//connect is a higher order component that modifies our components that uses redux
import "./header.styles.scss";
import CartIcon from "../cart-icon/cart-icon.component";

const Header = ({ currentUser }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/shop">
        CONTACT
      </Link>
      {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>
  </div>
);

//the state object is the root reducer
// from here we pass the current user property which has a value of state.user.currentUser
//then from root reducer we look for the user value which is userReducer
//this will then run and reutrn the currentUser value , null

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

//the first argument passed is to allow access to state, in this case being the root reducer
export default connect(mapStateToProps)(Header);
