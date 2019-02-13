import React, { Component } from "react";
import "../css/App.css";
import Splash from "./components/Splash";
import Main from "./components/Main";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./services";

class App extends Component {
  state = {
    isSplashVisible: true
  };
  onSplashClosed = () => {
    this.setState({ isSplashVisible: false });
  };
  render() {
    const { isSplashVisible } = this.state;
    return (
      <BrowserRouter>
        <Provider store={store}>
          {isSplashVisible && (
            <Splash whenClosed={this.onSplashClosed} closeAfter={10} />
          )}
          {!isSplashVisible && <Main />}
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
