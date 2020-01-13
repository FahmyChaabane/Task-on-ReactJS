import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

class Question extends Component {
  state = {
    answer: {
      provider: {
        userId: 1,
        userName: "Chaabane Fahmi"
      },
      description: "",
      date: "",
      question: {}
    },
    question: null,
    show: false
  };

  async componentDidMount() {
    const question = (
      await axios.get(
        "http://localhost:9090/greeting/" + this.props.match.params.id
      )
    ).data;
    this.setState({ question });
    const answer = { ...this.state.answer };
    answer.date = new Date();
    this.setState({ answer });
  }

  handleChange = ({ currentTarget: input }) => {
    const answer = { ...this.state.answer };
    answer[input.name] = input.value;
    this.setState({ answer });
    console.log(this.state.answer);
  };

  generateAnswer = () => {
    try {
      axios.post(
        "http://localhost:9090/answer/" + this.props.match.params.id,
        this.state.answer
      );
      console.log("done");
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { question } = this.state;
    if (question === null) return <p>Loading ...</p>;
    return (
      <Card>
        <Card.Header as="h5">{question.title}</Card.Header>
        <Card.Body className="container mt-3">
          <Card.Title>{question.description}</Card.Title>
          <Card.Text>
            Answers:
            <br />
            {question.answers.length === 0 ? (
              <span className="text-danger">No answers yet</span>
            ) : (
              question.answers.map((answer, idx) => (
                <p className="p-3 mb-2 bg-light text-dark" key={idx}>
                  <span className="font-weight-bold">
                    {answer.provider.userName} :{" "}
                  </span>{" "}
                  {answer.description}
                  <Form.Text className="text-muted">{answer.date}</Form.Text>
                </p>
              ))
            )}
          </Card.Text>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => {
              this.setState({ show: !this.state.show });
            }}
          >
            add an answer
          </button>
          {this.state.show === true && (
            <div className="container mt-5">
              <Form onSubmit={e => e.preventDefault()}>
                <Form.Control
                  type="text"
                  size="sm"
                  placeholder="Enter Comment"
                  onChange={this.handleChange}
                  value={this.state.answer.description}
                  name="description"
                />
                <button
                  className="btn btn-sm btn-info mt-2"
                  onClick={this.generateAnswer}
                >
                  Submit
                </button>
              </Form>
            </div>
          )}
        </Card.Body>
      </Card>
    );
  }
}

export default Question;
