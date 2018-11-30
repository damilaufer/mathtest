import React, { Component } from 'react';

import './App.css';
import { Face } from './Face'
import { Test } from './Test'

const QUESTIONS_NUMBER = 25;

const style = {
  picWrapper: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}

class App extends Component {
  state = {
    user: undefined,
    question: 0,
    ok: 0,
    error: 0
  }

  startTest = (name) => {
    console.warn(`Starting test for ${name}`);
    const questions = [];
    for (let index = 0; index < QUESTIONS_NUMBER + 1; index++) {
      const easy = Math.random() < 0.3;
      let x, y;
      if (easy) {
        x = 1 + Math.ceil(Math.random() * 6)
        y = 1 + Math.ceil(Math.random() * 6)
      } else {
        x = 1 + Math.ceil(Math.random() * 8)
        y = 1 + Math.ceil(Math.random() * 8)
      }
      questions.push({
        x, y,
      })
    }
    this.setState({
      user: name,
      question: 0,
      ok: 0,
      error: 0,
      questions,
    })
  }

  onAnswer = (x, y, answer) => {
    if (x * y === answer) {
      console.log(`${x} * ${y} = ${answer}`);
      this.setState({
        ok: this.state.ok + 1
      })
    } else {
      console.error(`${x} * ${y} = ${answer}`);
      this.setState({
        error: this.state.error + 1
      })
    }
    if (this.state.question === QUESTIONS_NUMBER) {
      console.warn('Test ended');
      console.warn(`OK=${this.state.ok}, error=${this.state.error}`)
      this.setState({
        user: undefined
      })
    } else {
      this.setState({
        question: this.state.question + 1
      })
    }
  }

  renderStartPage() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Who are you?
          </p>
          <div style={style.picWrapper}>
            <Face name="Maya" onClick={this.startTest} />
            <Face name="Dani" onClick={this.startTest} />
          </div>
        </header>
      </div>
    );
  }

  renderTestPage() {
    const { x, y } = this.state.questions[this.state.question];
    return (
      <div className="App">
        <header className="App-header">
          <p>
            I believe in you, {this.state.user}!
          </p>
          <Test x={x} y={y} onAnswer={this.onAnswer} />
        </header>
      </div>
    );
  }

  renderResults() {
    const { user, ok, error } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <p>
            {user}, these are your results!
        </p>
          <p>OK: {ok}</p>
          <p>Errors {error}</p>
        </header>
      </div>
    );
  }

  render() {
    if (this.state.user) {
      if (this.state.question === QUESTIONS_NUMBER) {
        return this.renderResults()
      } else {
        return this.renderTestPage()
      }
    } else {
      return this.renderStartPage()
    }

  }
}

export default App;
