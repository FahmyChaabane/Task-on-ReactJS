import React, { Component } from "react";
import shan from "./shan.png";
import "./App.css";
import NavBar from "./components/navBar";
import Questions from "./components/questions";
import Question from "./components/question";

import { Route } from "react-router-dom";
import axios from "axios";

class App extends Component {
  state = {
    questions: []
  };

  async componentDidMount() {
    console.log("App.jsx");
    const questions = (await axios.get("http://localhost:9090/greeting/")).data;
    this.setState({
      questions
    });
    console.log("here", questions);
  }

  submitquestion = async question => {
    try {
      const qu = (await axios.post("http://localhost:9090/greeting/", question))
        .data;
      // ahayaayayyaaaayayayayaayayay
      const questions = [qu, ...this.state.questions];
      this.setState({ questions });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div className="App">
        <div className="back">
          <NavBar submitquestion={msg => this.submitquestion(msg)} />
          <header className="App-header">
            <img src={shan} className="App-logo" alt="logo" />
            <h4 className="font1">
              The Uchiha clan (うちは一族, Uchiha Ichizoku) is one of the four
              noble clans of "Village Hidden in the Leaves" ..
            </h4>
          </header>
        </div>
        <div className="mt-1">
          <Route
            exact
            path="/"
            render={() => <Questions questions={this.state.questions} />}
          />
          <Route path="/question/:id" component={Question} />
        </div>
      </div>
    );
  }
}

export default App;
