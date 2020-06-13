import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { auth } from "../../firebase/firebase.utils";

import { ReactComponent as Logo } from "../../assets/crown.svg";

//connect is a higher order component that modifies our components that uses redux
import "./header.styles.scss";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCartHidden } from "../../redux/cart/cart.selectors";

const Header = ({ currentUser, hidden }) => (
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
    {hidden ? null : <CartDropdown />}
  </div>
);

//the state object is the root reducer
// from here we pass the current user property which has a value of state.user.currentUser
//then from root reducer we look for the user value which is userReducer
//this will then run and reutrn the currentUser value , null

// const mapStateToProps = (state) => ({
//   currentUser: state.user.currentUser,
// });

//then it is changed to this where the state of the cart drop down is added
// and instead of writing state.cart.hidden and state.user.current user
//i have destructured them both

// const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
//   currentUser,
//   hidden,
// });

//this next step i have used reselect to memoizecurrent user and hidden
// this will prevent rerendering if anything not related to hidden and current user is being called
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});
//the first argument passed is to allow access to state, in this case being the root reducer
export default connect(mapStateToProps)(Header);
