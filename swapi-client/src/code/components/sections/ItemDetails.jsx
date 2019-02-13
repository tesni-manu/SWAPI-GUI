import React from "react";
import { connect } from "react-redux";
import {
  getItemState,
  getLoadError,
  getStack,
  getImage,
  pop,
  getType,
  getSchemaProperties,
  toDisplayName,
  getId,
  clearStack
} from "../../services";
import Loading from "../common/Loading";
import Error from "../common/Error";
import "../../../css/components/sections/ItemDetails.css";

const getItemName = item => item.title || item.name; // Film has a title, others have names

class ItemDetails extends React.Component {
  state = {
    showChangeImageInput: false,
    imageUrl: ""
  };

  componentDidMount() {
    const { item } = this.props;
    const { push } = this.props.loaderFunctions;
    clearStack();
    push(item);
  }

  doClose = event => {
    const { whenClosed } = this.props;
    whenClosed();
  };

  goBack = event => {
    this.setState({
      showChangeImageInput: false,
      imageUrl: ""
    });
    pop(1);
  };

  toggleChangeImage = event => {
    this.setState({
      showChangeImageInput: !this.state.showChangeImageInput,
      imageUrl: ""
    });
  };

  onInputChanged = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  setImage = event => {
    const { currentItem } = this.props;
    const { setImage } = this.props.loaderFunctions;
    setImage(getType(currentItem), getId(currentItem), this.state.imageUrl);
    setTimeout(() => {
      this.setState({ showChangeImageInput: false, imageUrl: "" });
    }, 1000);
  };

  renderProperties = item => {
    const type = getType(item);
    const props = getSchemaProperties(type);
    const exclude = ["name", "title", "url", "created", "edited"];
    return (
      <div>
        {props.required
          .filter(p => exclude.indexOf(p) < 0)
          .map(prop => (
            <div key={prop}>
              <div className="details-prop-name">{toDisplayName(prop)}</div>
              <div className="details-prop-val">
                {this.renderProperty(prop, item[prop], props.properties[prop])}
              </div>
            </div>
          ))}
      </div>
    );
  };

  renderProperty = (name, value, meta) => {
    let result;
    const isLinkedProperty = ["homeworld"].indexOf(name) === 0;
    if (meta.type === "array" || isLinkedProperty) {
      let arr = value;
      if (isLinkedProperty) arr = [value];
      // Arrays are links to other objects
      result = (
        <div className="details-link-container">
          {arr.map(item => (
            <div
              key={item}
              onClick={() => this.showLinkedItem(item)}
              className="details-link-box"
            >
              <img
                src={getImage({ url: item })}
                alt={item}
                className="details-link-img"
              />
            </div>
          ))}
        </div>
      );
    } else result = value;
    return result;
  };

  showLinkedItem = url => {
    this.setState({
      showChangeImageInput: false,
      imageUrl: ""
    });
    const { push } = this.props.loaderFunctions;
    push(url);
    window.scrollTo(0, 0);
  };

  render() {
    const { loadingState, loadError, stack, currentItem } = this.props;
    const { showChangeImageInput, imageUrl } = this.state;
    return (
      <div className="details-bg">
        <section className="details-body">
          {loadingState === "loading" && (
            <div className="details-content">
              <div className="details-loading">
                <Loading />
              </div>
            </div>
          )}
          {loadingState === "error" && (
            <div className="details-content">
              <button onClick={this.doClose} className="details-topbuttons">
                Close
              </button>
              <Error error={loadError} />
            </div>
          )}
          {loadingState === "ok" && (
            <div className="details-content">
              {stack.length > 1 && (
                <button onClick={this.goBack} className="details-topbuttons">
                  Back
                </button>
              )}
              <button onClick={this.doClose} className="details-topbuttons">
                Close
              </button>
              <h1 className="details-title">{getItemName(currentItem)}</h1>
              <div className="details-img-container">
                <img
                  src={getImage(currentItem)}
                  alt={getItemName(currentItem)}
                  className="details-img"
                />
                <div className="details-img-change-container">
                  {!showChangeImageInput && (
                    <button
                      onClick={this.toggleChangeImage}
                      className="details-buttons"
                    >
                      Change Image
                    </button>
                  )}
                  {showChangeImageInput && (
                    <div>
                      <input
                        type="text"
                        placeholder="Copy and paste the image URL here"
                        value={imageUrl}
                        name="imageUrl"
                        onChange={this.onInputChanged}
                        className="details-change-img-input"
                        ref={input => {
                          if (input) input.focus();
                        }}
                      />
                      <button
                        onClick={this.toggleChangeImage}
                        className="details-buttons"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={this.setImage}
                        className="details-buttons"
                      >
                        Save this image
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="details-clickhelp">
                Click on the thumbnails below to see more details
                {stack.length > 1 &&
                  ", and click on Back button on top right to view the previous item."}
              </div>
              {this.renderProperties(currentItem)}
            </div>
          )}
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const stack = getStack();
  return {
    loadingState: getItemState(),
    loadError: getLoadError(),
    stack: stack,
    currentItem: stack[stack.length - 1] // item on top of the stack
  };
};

export default connect(mapStateToProps)(ItemDetails);
