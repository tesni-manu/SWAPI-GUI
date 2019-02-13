import React from "react";
import { Route, NavLink, withRouter, Switch, Redirect } from "react-router-dom";
import Films from "./sections/Films";
import { connect } from "react-redux";
import { isFirstTime, resetFirstTimeFlag } from "../services";
import PropTypes from "prop-types";
import Section from "./sections/Section";
import NotFound from "./NotFound";
import "../../css/components/Main.css";
import {
  search,
  loadNext,
  loadPrevious,
  clearSearch,
  push,
  setImage
} from "../services";
import yodaImage from "../../img/yoda.png";

class Main extends React.Component {
  static propTypes = {
    isFirstTime: PropTypes.bool
  };
  state = { timer: undefined };
  componentDidMount() {
    const { isFirstTime } = this.props;
    if (isFirstTime) {
      this.setState({
        timer: setTimeout(() => {
          resetFirstTimeFlag();
          this.setState({ timer: undefined });
        }, 20 * 1000)
      });
    }
  }
  componentWillUnmount() {
    const { timer } = this.state;
    if (timer) clearTimeout(timer);
  }
  render() {
    const { isFirstTime } = this.props;
    // The following are dependencies, ie. service functions used to load data.
    // Passing them as props helps in easily using doubles in unit tests.
    const loaderFunctions = {
      search,
      loadNext,
      loadPrevious,
      clearSearch,
      push,
      setImage
    };
    return (
      <div className="main-body">
        <header className="main-header">
          <div className="main-title">
            <img src={yodaImage} alt="yoda" className="main-yoda" />
            <span className="main-yoda-says">
              Explore the universe, you must!
            </span>
          </div>
        </header>
        <aside>
          <div className="main-subheader">
            <nav>
              <NavLink
                className="main-menuitem"
                activeClassName="main-selectedmenuitem"
                to="/films"
              >
                Films
              </NavLink>
              <NavLink
                className="main-menuitem"
                activeClassName="main-selectedmenuitem"
                to="/people"
              >
                People
              </NavLink>
              <NavLink
                className="main-menuitem"
                activeClassName="main-selectedmenuitem"
                to="/species"
              >
                Species
              </NavLink>
              <NavLink
                className="main-menuitem"
                activeClassName="main-selectedmenuitem"
                to="/starships"
              >
                Starships
              </NavLink>
              <NavLink
                className="main-menuitem"
                activeClassName="main-selectedmenuitem"
                to="/planets"
              >
                Planets
              </NavLink>
              <NavLink
                className="main-menuitem"
                activeClassName="main-selectedmenuitem"
                to="/vehicles"
              >
                Vehicles
              </NavLink>
            </nav>
          </div>
        </aside>
        <p
          className={`main-wikipedia ${
            isFirstTime ? "" : "main-wikipedia-hidden"
          }`}
        >
          {isFirstTime && (
            <span>
              Wikipedia:{" "}
              <q>
                Star Wars is an American epic space opera franchise, created by
                George Lucas and centered around a film series that began with
                the eponymous 1977 movie. The saga quickly became a worldwide
                pop culture phenomenon.
              </q>
            </span>
          )}
        </p>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/films" />} />
          <Route
            path="/films"
            render={() => <Films loaderFunctions={loaderFunctions} />}
          />
          <Route
            path="/people"
            render={() => (
              <Section
                type="people"
                loaderFunctions={loaderFunctions}
                listProperties={["gender", "birth_year"]}
              />
            )}
          />
          <Route
            path="/species"
            render={() => (
              <Section
                type="species"
                loaderFunctions={loaderFunctions}
                listProperties={["classification"]}
              />
            )}
          />
          <Route
            path="/starships"
            render={() => (
              <Section
                type="starships"
                loaderFunctions={loaderFunctions}
                listProperties={["starship_class"]}
              />
            )}
          />
          <Route
            path="/planets"
            render={() => (
              <Section
                type="planets"
                loaderFunctions={loaderFunctions}
                listProperties={["terrain", "climate"]}
              />
            )}
          />
          <Route
            path="/vehicles"
            render={() => (
              <Section
                type="vehicles"
                loaderFunctions={loaderFunctions}
                listProperties={["manufacturer"]}
              />
            )}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({ isFirstTime: isFirstTime() });

export default withRouter(connect(mapStateToProps)(Main));
