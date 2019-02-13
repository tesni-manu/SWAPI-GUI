import React from "react";
import "../../../css/components/common/Error.css";

function Error(props) {
  return <div className="error">{props.error}</div>;
}

export default Error;
