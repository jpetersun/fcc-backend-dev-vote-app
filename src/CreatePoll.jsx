import React from 'react'
import axios from 'axios'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const inputStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
}

const deleteButtonStyle = {
  margin: '1rem 0'
}

class UserInput extends React.Component {
  constructor (props) {
    super(props)

    this.removeOption = this.removeOption.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      display: true,
      value: ''
    }
  }

  handleChange (event) {
    this.setState({value: event.target.value})
  }

  removeOption (e) {
    e.preventDefault()
    this.setState({
      display: !this.state.display
    })
  }

  render () {
    if (!this.state.display) {
      return null
    }

    // const randyKey = String((Math.floor(Math.random() * 1000) + Math.floor(Math.random() * 1000)))
    // const randyName = 'option' + randyKey
    // <button onClick={this.removeOption} style={deleteButtonStyle} className='delete-option'>Delete</button>
    return (
      <input required className='input__option' type='text' value={this.state.value} onChange={this.handleChange} />
    )
  }
}

class CreatePoll extends React.Component {
  constructor (props) {
    super(props)
    this.state = {options: []}

    this.renderOption = this.renderOption.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  renderOption (e) {
    e.preventDefault()
    const optionState = this.state.options
    const randyKey = String((Math.floor(Math.random() * 1000) + Math.floor(Math.random() * 1000)))
    optionState.push(<UserInput key={randyKey} />)
    this.setState({options: optionState})
  }

  handleRemove (i) {
    let newItems = this.state.options.slice()
    newItems.splice(i, 1)
    this.setState({options: newItems})
  }

  handleSubmit (e) {
    const defaultInputs = Array.from(document.getElementsByClassName('input__option--default'))
    const userInputs = Array.from(document.getElementsByClassName('input__option'))
    const inputs = defaultInputs.concat(userInputs)
    const values = inputs.map(input => input.value)
    const name = document.getElementById('poll-name').value

    axios.post('/create-poll', {
      name,
      values
    })
    .then((response) => {
      window.location = '/'
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render () {
    const options = this.state.options.map((option, i) => {
      return (
        <div key={option.key} style={inputStyle}>
          {option}
          <span onClick={() => this.handleRemove(i)} style={deleteButtonStyle} className='delete-option'>Delete</span>
        </div>
      )
    })
    return (
      <form onSubmit={this.handleSubmit} method='post' action='/create-poll'>
        <p>Create A Poll</p>
        <label>Name: <input required type='text' id='poll-name' /></label>
        <input required className='input__option--default' type='text' />
        <input required className='input__option--default' type='text' />
        <ReactCSSTransitionGroup
          transitionName='user-input'
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {options}
        </ReactCSSTransitionGroup>
        <button className='create-poll__add-btn' onClick={this.renderOption}>Add Option</button>
        <input className='submit-btn' type='submit' />
      </form>
    )
  }
}

export default CreatePoll
