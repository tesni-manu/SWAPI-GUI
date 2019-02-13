import React from "react";
import "../../../css/components/common/Loading.css";

function Loading(props) {
  return (
    <div>
      <div className="loading" />
      <span className="loading-text">Loading ...</span>
    </div>
  );
}

export default Loading;
