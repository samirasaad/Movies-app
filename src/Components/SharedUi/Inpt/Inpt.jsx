import React from "react";

function Inpt({ type, val, handleChange }) {
  return <input type={type} value={val} onChange={handleChange} />;
}

export default Inpt;
