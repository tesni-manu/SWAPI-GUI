import React from "react";
import "../../../css/components/common/Modal.css";

class Modal extends React.Component {
  render() {
    const { show, children } = this.props;
    if (show) window.scrollTo(0, 0);
    return (
      <div className={show ? "modal-visible" : "modal-invisible"}>
        {children}
      </div>
    );
  }
}

export default Modal;
