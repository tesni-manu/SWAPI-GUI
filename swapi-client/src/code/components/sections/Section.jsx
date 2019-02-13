import React from "react";
import { toDisplayName } from "../../services/utils";
import { connect } from "react-redux";
import {
  getListState,
  getList,
  getImage,
  getLoadError,
  hasNext,
  hasPrevious
} from "../../services";
import Loading from "../common/Loading";
import Error from "../common/Error";
import ItemDetails from "./ItemDetails";
import "../../../css/components/sections/Section.css";
import Modal from "../common/Modal.jsx";

class Section extends React.Component {
  state = {
    itemBeingViewed: undefined,
    searchKeyword: ""
  };

  componentDidMount() {
    this.doSearch();
  }

  componentDidUpdate(prevProps) {
    if (this.props.type !== prevProps.type) {
      this.clearSearch();
    }
  }

  showItemDetails = item => {
    this.setState({ itemBeingViewed: item });
  };

  hideItemDetails = () => {
    this.setState({ itemBeingViewed: undefined });
  };

  onInputChanged = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  doSearch = () => {
    const { type } = this.props;
    const { search } = this.props.loaderFunctions;
    search(type, this.state.searchKeyword);
    this.setState({ itemBeingViewed: undefined });
  };

  clearSearch = () => {
    this.setState({ searchKeyword: "" });
    this.doSearch();
  };

  handleKeyPress = event => {
    if (event.key === "Enter") this.doSearch();
  };

  render() {
    const {
      loadingState,
      loadError,
      list,
      loaderFunctions,
      type,
      listProperties,
      hasNext,
      hasPrevious
    } = this.props;
    const { loadNext, loadPrevious } = this.props.loaderFunctions;
    const { itemBeingViewed, searchKeyword } = this.state;
    return (
      <div>
        <section className="section-body">
          <div className="section-header">
            <h1 className="section-title">
              {toDisplayName(type)} in the Star Wars Universe
            </h1>
            {loadingState === "loading" && (
              <div className="section-othercontents">
                <Loading />
              </div>
            )}
            {loadingState === "error" && (
              <div className="section-othercontents">
                <Error error={loadError} />
              </div>
            )}
            {loadingState === "ok" && (
              <div>
                <div className="section-search-container">
                  <input
                    type="text"
                    placeholder="Name to search."
                    value={searchKeyword}
                    name="searchKeyword"
                    onChange={this.onInputChanged}
                    onKeyPress={this.handleKeyPress}
                    className="section-search-input"
                  />
                  <button
                    onClick={this.doSearch}
                    className="section-buttons section-search-button"
                  >
                    Search
                  </button>
                  <button
                    onClick={this.clearSearch}
                    className="section-buttons"
                  >
                    Clear
                  </button>
                </div>
                <div className="section-contents">
                  {list.length > 0 && (
                    <div className="section-content-inner">
                      <div className="section-navbuttons-bar">
                        {hasPrevious && (
                          <button
                            onClick={this.doSearch}
                            className="section-buttons section-first"
                          >
                            First
                          </button>
                        )}
                        {hasPrevious && (
                          <button
                            onClick={loadPrevious}
                            className="section-buttons section-previous"
                          >
                            Previous
                          </button>
                        )}
                        <p className="section-clickhelp">
                          Click on an item below to view details
                        </p>
                        {hasNext && (
                          <button
                            onClick={loadNext}
                            className="section-buttons section-next"
                          >
                            Next
                          </button>
                        )}
                      </div>
                      <table className="section-table">
                        <tbody>
                          {list.map(item => (
                            <tr
                              key={item.title}
                              onClick={() => this.showItemDetails(item)}
                            >
                              <td className="section-cell-image">
                                <div className="section-box">
                                  <img
                                    src={getImage(item)}
                                    alt={item.title}
                                    className="section-img"
                                  />
                                </div>
                              </td>
                              <td className="section-cell">{item.name}</td>
                              {listProperties.map(prop => (
                                <td key={prop} className="section-cell">
                                  {item[prop]}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {list.length < 1 && (
                    <Error error="Sorry, no results found." />
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
        <Modal show={itemBeingViewed !== undefined}>
          {itemBeingViewed !== undefined && (
            <ItemDetails
              item={itemBeingViewed}
              loaderFunctions={loaderFunctions}
              whenClosed={this.hideItemDetails}
            />
          )}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loadingState: getListState(),
  loadError: getLoadError(),
  list: getList(),
  hasNext: hasNext(),
  hasPrevious: hasPrevious()
});

export default connect(mapStateToProps)(Section);
