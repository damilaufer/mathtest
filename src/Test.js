import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Test extends Component {
  state = {
    answer: ''
  }

  styles = {
    textField: {
    }
  }

  setAnswer = (e) => {
    this.setState({
      answer: e.target.value
    })
  }

  handleAnswer = () => {
    const { x, y, onAnswer } = this.props;
    const { answer } = this.state;
    this.setState({
      answer: ''
    })
    onAnswer(x, y, Number(answer))
  }

  render() {
    const { x, y } = this.props;
    const { answer } = this.state;
    return (
      <div>
        How much is {x} * {y}?
      <TextField
          autoFocus
          onChange={this.setAnswer}
          value={answer}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && answer) {
              this.handleAnswer();
            }
          }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={this.handleAnswer}
          disabled={!answer}
        >
          Submit
      </Button>
      </div>)
  }
}
export { Test }
