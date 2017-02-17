const React = require('react')
const axios = require('axios')

class Details extends React.Component {
  constructor (props) {
    super(props)
    this.state = {value: 'coconut'}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({value: event.target.value})
  }

  handleSubmit (event) {
    console.log(this.state)
    event.preventDefault()
    axios.post('http://127.0.0.1:/27017/vote-app', { firstName: 'Marlon', lastName: 'Bernardes' })
    .then(function (response) {
      console.log('saved successfully')
    })
  }

  render () {
    return (
      // <form onSubmit={this.handleSubmit}>
      <form method='post' action='/poll-results'>
        <label>
          <p>Pick your favorite La Croix flavor:</p>
          <select value={this.state.value} onChange={this.handleChange} name='selectpicker'>
            <option name='option1' value='grapefruit'>Grapefruit</option>
            <option name='option2' value='lime'>Lime</option>
            <option name='option3' value='coconut'>Coconut</option>
            <option name='option4' value='mango'>Mango</option>
          </select>
        </label>
        <input type='submit' value='Submit' />
      </form>
    )
  }
}
module.exports = Details
