import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
//import axios from "axios";

class MyVerticallyCenteredModal extends Component {
  state = {
    question: {
      provider: {
        userName: "Helmy",
        answers: [],
        questions: []
      },
      title: "",
      description: "",
      date: "",
      answers: []
    }
  };

  componentDidMount() {
    const question = { ...this.state.question };
    question.date = new Date();
    this.setState({ question });
  }

  handleChange = ({ currentTarget: input }) => {
    const question = { ...this.state.question };
    question[input.name] = input.value;
    this.setState({ question });
    console.log(this.state.question);
  };

  endTheQuestion = async param => {
    this.props.submitquestion(param);
    let question = { ...this.state.question };
    question.title = "";
    question.description = "";
    this.setState({ question });
    this.props.onHide();
  };

  render() {
    const { title, description } = this.state.question;
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Insert Your Question
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={e => e.preventDefault()}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                onChange={this.handleChange}
                value={title}
                name="title"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                onChange={this.handleChange}
                value={description}
                name="description"
              />
            </Form.Group>

            <button
              className="btn btn-sm btn-block btn-info"
              onClick={() => this.endTheQuestion(this.state.question)}
            >
              Submit
            </button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-sm btn-danger" onClick={this.props.onHide}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default MyVerticallyCenteredModal;
