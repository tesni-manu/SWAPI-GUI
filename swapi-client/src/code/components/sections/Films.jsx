import React from "react";
import { connect } from "react-redux";
import { getListState, getList, getImage, getLoadError } from "../../services";
import Loading from "../common/Loading";
import Error from "../common/Error";
import ItemDetails from "./ItemDetails";
import "../../../css/components/sections/Films.css";
import Modal from "../common/Modal.jsx";
class Films extends React.Component {
  state = {
    filmBeingViewed: undefined
  };

  componentDidMount() {
    const { search } = this.props.loaderFunctions;
    search("films", "");
  }

  showFilmDetails = film => {
    this.setState({ filmBeingViewed: film });
  };

  hideFilmDetails = () => {
    this.setState({ filmBeingViewed: undefined });
  };

  render() {
    const { loadingState, loadError, films, loaderFunctions } = this.props;
    const { filmBeingViewed } = this.state;
    return (
      <div>
        <section className="film-body">
          <div className="film-header">
            <h1 className="film-title">Star Wars Films</h1>
            <p className="film-clickhelp">
              Click on a film to see more details
            </p>
          </div>
          {loadingState === "loading" && (
            <div className="film-othercontents">
              <Loading />
            </div>
          )}
          {loadingState === "error" && (
            <div className="film-othercontents">
              <Error error={loadError} />
            </div>
          )}
          {loadingState === "ok" && (
            <div className="film-contents">
              {films.map(film => (
                <div
                  key={film.title}
                  onClick={() => this.showFilmDetails(film)}
                  className="film-box"
                >
                  <h2 className="film-name">{film.title}</h2>
                  <img
                    src={getImage(film)}
                    alt={film.title}
                    className="film-image"
                  />
                </div>
              ))}
            </div>
          )}
        </section>
        <Modal show={filmBeingViewed !== undefined}>
          {filmBeingViewed !== undefined && (
            <ItemDetails
              item={filmBeingViewed}
              loaderFunctions={loaderFunctions}
              whenClosed={this.hideFilmDetails}
            />
          )}
        </Modal>
      </div>
    );
  }
}

const descByReleaseDate = (a, b) => (a.release_date < b.release_date ? 1 : -1);

const mapStateToProps = state => ({
  loadingState: getListState(),
  loadError: getLoadError(),
  films: getList().sort(descByReleaseDate)
});

export default connect(mapStateToProps)(Films);
