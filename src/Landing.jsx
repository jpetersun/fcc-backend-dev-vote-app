import React from 'react'
import Poll from './Poll'

import axios from 'axios'

const ul = {
  listStyleType: 'none',
  paddingLeft: '0'
}

class Landing extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      userData: []
    }
  }

  componentDidMount () {
    axios.get('/polls')
      .then((response) => {
        this.setState({ userData: response.data })
      })
      .catch((error) => {
        console.error('axios error', error)
      })
  }

  render () {
    const polls = []
    this.state.userData.forEach((user) => {
      user.polls.forEach((poll) => {
        poll.userId = user._id
        polls.push(poll)
      })
    })

    return (
      <ul style={ul}>
        {polls.map((poll) => (
          <Poll {...poll} key={poll._id} />
        ))}
      </ul>
    )
  }
}

export default Landing
