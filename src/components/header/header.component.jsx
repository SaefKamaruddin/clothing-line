import React from "react";
import { connect } from "react-redux";
import { auth } from "../../firebase/firebase.utils";

import { ReactComponent as Logo } from "../../assets/crown.svg";

//connect is a higher order component that modifies our components that uses redux
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
  OptionDiv,
} from "./header.styles.jsx";

const Header = ({ currentUser, hidden }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo" />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to="/shop">SHOP</OptionLink>
      <OptionLink to="/shop">CONTACT</OptionLink>
      {currentUser ? (
        <OptionDiv onClick={() => auth.signOut()}>SIGN OUT</OptionDiv>
      ) : (
        <OptionLink to="/signin">SIGN IN</OptionLink>
      )}
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
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
