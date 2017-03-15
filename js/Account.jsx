const React = require('react')
const UserPoll = require('./UserPoll')
const axios = require('axios')
class Account extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      userData: {
        polls: []
      }
    }
  }
  componentDidMount () {
    axios.get('/account-details')
      .then((response) => {
        this.setState({ userData: response.data })
      })
      .catch((error) => {
        console.error('axios error', error)
      })
  }
  componentDidUpdate () {
    axios.get('/account-details')
      .then((response) => {
        this.setState({ userData: response.data })
      })
      .catch((error) => {
        console.error('axios error', error)
      })
  }
  render () {
    const polls = []
    this.state.userData.polls.forEach((poll) => {
      poll.userId = this.state.userData._id
      polls.push(poll)
    })
    return (
      <div>
        <h4>{this.state.userData.name}</h4>
        <img src={this.state.userData.avatar} alt='thing' />
        <ul className='demo-list-item mdl-list'>
          {polls.map((poll) => (
            <UserPoll {...poll} key={poll._id} />
          ))}
        </ul>
      </div>
    )
  }
}

module.exports = Account
