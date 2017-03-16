const React = require('react')

class CreatePoll extends React.Component {
  constructor (props) {
    super(props)
    this.state = {value: ''}

    this.handleChange = this.handleChange.bind(this)
    this.handleAddOption = this.handleAddOption.bind(this)
  }

  handleChange (event) {
    this.setState({value: event.target.value})
  }

  handleAddOption (event) {
    React.createElement(
      'input',
      []
    )
  }

  render () {
    return (
      <form method='post' action='/create-poll'>
        <p>Create A Poll</p>
        <button onClick={this.handleAddOption}>Add Option</button>
        <label>Name: <input type='text' name='poll[name]' /></label>
        <label>Option 1: <input type='text' name='poll[option1]' /></label>
        <label>Option 2: <input type='text' name='poll[option2]' /></label>
        <input type='submit' value='Submit' />
      </form>
    )
  }
}
module.exports = CreatePoll
