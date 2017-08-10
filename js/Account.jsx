import React from 'react'
import UserPolls from './UserPolls'
import axios from 'axios'

const ul = {
  listStyleType: 'none',
  paddingLeft: '0'
}

const img = {
  maxWidth: '50px',
  display: 'block',
  margin: '0 auto',
  borderRadius: '50%'
}

const header = {
  textAlign: 'center'
}

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

  render () {
    const polls = []

    this.state.userData.polls.forEach((poll) => {
      poll.userId = this.state.userData._id
      polls.push(poll)
    })

    return (
      <div>
        <img style={img} src={this.state.userData.avatar} alt={this.state.userData.name} />
        <h4 style={header}>{this.state.userData.name}</h4>
        <ul style={ul}>
          {polls.map((poll) => (
            <UserPolls {...poll} key={poll._id} />
          ))}
        </ul>
      </div>
    )
  }
}

export default Account
