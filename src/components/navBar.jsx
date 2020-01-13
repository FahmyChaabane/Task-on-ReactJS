import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import MyVerticallyCenteredModal from "./myVerticallyCenteredModal";

class NavBar extends Component {
  state = {
    modalShow: false
  };

  render() {
    let modalClose = () => this.setState({ modalShow: false });

    return (
      <div className="row">
        <div className="col">
          <h4
            className="cover font-weight-bold font1"
            onClick={this.navigateBack}
          >
            Uchiha of the Hidden Leaves
          </h4>
        </div>
        <div className="nav nav-masthead justify-content-center col">
          <NavLink className="nav-link active" to="/">
            Home
          </NavLink>
          <div
            className="nav-link active"
            onClick={() => this.setState({ modalShow: true })}
          >
            Ask a Question
          </div>
          <MyVerticallyCenteredModal
            submitquestion={msg => this.props.submitquestion(msg)}
            show={this.state.modalShow}
            onHide={modalClose}
          />
        </div>
      </div>
    );
  }
}

export default NavBar;
