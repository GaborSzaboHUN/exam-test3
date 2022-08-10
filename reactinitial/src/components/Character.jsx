import React, { useState } from "react";
import "./Character.css";

function Character({ name, details }) {
  const [isVisible, setVisible] = useState(false);

  const visibilityHandler = () => {
    setVisible(!isVisible);
  };

  return (
    <>
      <h2>{name}</h2>
      <p className={isVisible ? "" : "hidden"}>{details}</p>
      <button onClick={visibilityHandler}>Show more</button>
    </>
  );
}

export default Character;
