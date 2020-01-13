import React, { Component } from "react";
import { Link } from "react-router-dom";
//import axios from "axios";

class Questions extends Component {
  state = {
    //questions: []
  };

  /*

  async componentDidMount() {
    console.log("questions.jsx");
    const questions = (await axios.get("http://localhost:8080/greeting/")).data;
    this.setState({
      questions
    });
    console.log("here", questions);
  }
  */

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.props.questions.length === 0 && <p>Loading questions...</p>}
          {this.props.questions.map(question => (
            <div
              key={question.questionId}
              className="col-sm-12 col-md-4 col-lg-3"
            >
              <Link to={"/question/" + question.questionId}>
                <div className="card text-white bg-primary mb-3">
                  <div className="card-header">
                    {question.provider.userName}
                  </div>
                  <div className="card-body">
                    <h4 className="card-title">{question.title}</h4>
                    <p className="card-text">{question.description}</p>
                    <small className="card-text">{question.date}</small>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Questions;
