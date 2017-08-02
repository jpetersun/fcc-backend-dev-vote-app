const React = require('react')
const axios = require('axios')

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
    this.state = {
      display: true
    }
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

    const randyKey = String((Math.floor(Math.random() * 1000) + Math.floor(Math.random() * 1000)))
    const randyName = 'option' + randyKey

    return (
      <div key={randyKey} name={randyName} style={inputStyle}>
        <input required className='input__option' type='text' />
        <button onClick={this.removeOption} style={deleteButtonStyle} className='delete-option'>Delete</button>
      </div>
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
    optionState.push(<UserInput />)
    this.setState({options: optionState})
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
    return (
      <form onSubmit={this.handleSubmit} method='post' action='/create-poll'>
        <p>Create A Poll</p>
        <label>Name: <input required type='text' id='poll-name' /></label>
        <input required className='input__option--default' type='text' />
        <input required className='input__option--default' type='text' />
        {this.state.options}
        <button className='create-poll__add-btn' onClick={this.renderOption}>Add Option</button>
        <input className='submit-btn' type='submit' />
      </form>
    )
  }
}

module.exports = CreatePoll
