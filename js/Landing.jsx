const React = require('react')
const Poll = require('./Poll')
// const fakeData = require('../public/data.json')
// console.log(fakeData)
// const { object, arrayOf } = React.PropTypes
// console.log(polls)
const axios = require('axios')
class Landing extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      pollData: []
    }
  }
  componentDidMount () {
    axios.get('/polls')
      .then((response) => {
        this.setState({ pollData: response.data })
      })
      .catch((error) => {
        console.error('axios error', error)
      })
  }
  render () {
    return (
      <ul className='demo-list-item mdl-list'>
        {this.state.pollData.map((poll) => (
          <Poll {...poll} key={poll._id} />
        ))}
      </ul>
    )
  }
}

module.exports = Landing
