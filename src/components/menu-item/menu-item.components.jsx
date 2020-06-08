import React from "react";
import "./menu-item.styles.scss";
import { withRouter } from "react-router-dom";

// functional component used because not holding any state
// destructure title
// style takes an object and applies css values to an element

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
  <div
    className={`${size} menu-item`}
    onClick={() => history.push(`${match.url}${linkUrl}`)}
  >
    <div
      className="background-image"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    />
    <div className="content">
      <h1 className="title">{title.toUpperCase()}</h1>
      <span className="subtitle">TOPS</span>
    </div>
  </div>
);

export default withRouter(MenuItem);
// with router is a higher order component. a fx that takes in a component as an argumet and modifies it
// in the case with withRouter it adds access to location, match and history proprs
