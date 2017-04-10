const React = require('react')
const axios = require('axios')
// class Option extends React.Component {
//   constructor (props) {
//     super(props)

//     this.handleDelete = this.handleDelete.bind(this)
//     this.pollName = 'poll' + (Math.floor(Math.random() * 1000) + Math.floor(Math.random() * 1000))
//     this.state = {
//       name: this.pollName
//     }
//   }

//   handleDelete (e) {
//     console.log('delete option')
//   }

//   render () {
//     return (
//       <div>
//         <label>Option: <input type='text' /></label>
//         <button onClick={this.handleDelete}>Delete</button>
//       </div>
//     )
//   }
// }

class CreatePoll extends React.Component {
  constructor (props) {
    super(props)
    this.state = {options: [], submitOptions: []}

    this.renderOption = this.renderOption.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  renderOption () {
    const randyKey = String((Math.floor(Math.random() * 1000) + Math.floor(Math.random() * 1000)))
    const randyName = 'option' + randyKey
    const optionState = this.state.options
    optionState.push(<input required className='input__option' key={randyKey} data-value={this.state.value} name={randyName} type='text' />)
    this.setState({options: optionState})
  }

  handleSubmit () {
    const inputs = Array.from(document.getElementsByClassName('input__option'))
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
        <input required className='input__option' type='text' />
        {this.state.options}
        <button className='create-poll__add-btn' onClick={this.renderOption}>Add Option</button>
        <input className='submit-btn' type='submit' />
      </form>
    )
  }
}
module.exports = CreatePoll
