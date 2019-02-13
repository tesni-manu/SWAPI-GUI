import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isSchemaLoaded, getSchemaError } from "../services";
import Loading from "./common/Loading.jsx";
import Error from "./common/Error.jsx";
import "../../css/components/Splash.css";

class Splash extends React.Component {
  static propTypes = {
    whenClosed: PropTypes.func,
    closeAfter: PropTypes.number
  };

  state = {
    closeTimer: undefined,
    timerValue: 0,
    hasTimedOut: false
  };

  static defaultProps = {
    whenClosed: () => {},
    closeAfter: 2
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }

  onTimer = () => {
    const { timerValue } = this.state;
    if (timerValue === 1) {
      this.setState({ timerValue: 0 });
      this.doClose();
    } else {
      const closeTimer = setTimeout(this.onTimer, 1000);
      this.setState({ closeTimer, timerValue: timerValue - 1 });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { isSchemaLoaded, schemaError, closeAfter } = this.props;
    const { hasTimedOut, closeTimer } = this.state;
    if (isSchemaLoaded && !schemaError && !hasTimedOut && !closeTimer) {
      const closeTimer = setTimeout(this.onTimer, 1000);
      this.setState({ closeTimer, timerValue: closeAfter });
    }
  }

  buttonClicked = event => {
    this.doClose();
  };

  doClose = () => {
    const { whenClosed } = this.props;
    const { closeTimer } = this.state;
    if (closeTimer !== undefined) {
      clearTimeout(closeTimer);
      this.setState({ closeTimer: undefined, hasTimedOut: true });
    }
    whenClosed();
  };

  handleKeyPress = event => {
    if (event.key === "Enter") this.doClose();
  };

  render() {
    const { timerValue } = this.state;
    const { isSchemaLoaded, schemaError } = this.props;
    return (
      <header className="splash-body">
        <h1 className="splash-title">Star Wars Universe Explorer!</h1>
        <h3 className="splash-subtitle">May the Force be with You!</h3>
        {!isSchemaLoaded && (
          <div className="splash-status">
            <Loading />
          </div>
        )}
        {isSchemaLoaded && !schemaError && (
          <div className="splash-ok">
            <p>Will start automatically in {timerValue} seconds</p>
            <button onClick={this.buttonClicked}>Start Now</button>
          </div>
        )}
        {isSchemaLoaded && schemaError && (
          <div className="splash-status">
            <Error error={schemaError} />
          </div>
        )}
      </header>
    );
  }
}

const mapStateToProps = state => ({
  isSchemaLoaded: isSchemaLoaded(),
  schemaError: getSchemaError()
});

export default connect(mapStateToProps)(Splash);
