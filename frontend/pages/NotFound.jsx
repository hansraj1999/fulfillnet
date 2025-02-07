import React from "react";
import "./style/notfound.css"; // Import the CSS file

export default function NotFound(props = {}) {
  const { text = "No Data Found" } = props;
  return (
    <div className="not-found">
      <h3>{text}</h3>
      {/* <p>Oops! no data found..</p> */}
    </div>
  );
}
