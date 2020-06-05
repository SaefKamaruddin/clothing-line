import React from "react";
import "./menu-item.styles.scss";

// functional component used because not holding any state
// destructure title
// style takes an object and applies css values to an element

const MenuItem = ({ title, imageUrl, size }) => (
  <div className={`${size} menu-item`}>
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

export default MenuItem;
