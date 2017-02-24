const React = require('react')
const PollOption = require('./PollOption')
const axios = require('axios')
const _ = require('lodash')

class Details extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pollData: {
        name: '',
        options: [
          {name: '', _id: '1'},
          {name: '', _id: '2'}
        ]
      },
      value: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({value: event.target.value})
  }
  handleSubmit (event) {
    const value = this.state.value
    const obj = _.find(this.state.pollData.options, {name: value})
    const name = obj.name
    const id = obj._id
    axios.post(`/poll-results/${this.props.params.id}`, {
      name: name,
      _id: id
    })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.error('axios error', error)
    })
    event.preventDefault()
  }

  componentDidMount () {
    axios.get(`/polls/${this.props.params.id}`)
      .then((response) => {
        const firstOption = response.data.options[0].name
        this.setState({ pollData: response.data, value: firstOption })
      })
      .catch((error) => {
        console.error('axios error', error)
      })
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}method='post' action='/poll-results'>
        <label>
          <p>Pick your favorite: {this.state.pollData.name}</p>
          <select onChange={this.handleChange} name='selectpicker'>
            {this.state.pollData.options.map((option) => (
              <PollOption {...option} key={option._id} />
            ))}
          </select>
        </label>
        <input type='submit' value='Submit' />
      </form>
    )
  }
}

const { object } = React.PropTypes

Details.propTypes = {
  params: object,
  pollData: object
}
module.exports = Details
