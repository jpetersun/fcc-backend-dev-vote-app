import React from 'react'
import { Link } from 'react-router'
import axios from 'axios'

const link = {
  color: '#000'
}

const { string, func, bool } = React.PropTypes

class Warning extends React.Component {
  constructor (props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete (e) {
    axios.delete(`/user-poll/${this.props.userId}/${this.props._id}`)
      .then((response) => {
        this.props.unmountMe()
      })
      .catch((error) => {
        console.error('axios error', error)
      })
  }

  render () {
    if (!this.props.warn) {
      return null
    }
    return (
      <div className='warning'>
        Delete Poll - {this.props.name}?
        <div>
          <span className='delete' onClick={this.handleDelete}>Delete</span>
        </div>
      </div>
    )
  }
}

Warning.propTypes = {
  userId: string.isRequired,
  _id: string.isRequired,
  unmountMe: func.isRequired,
  warn: bool.isRequired,
  name: string.isRequired
}

class PollItem extends React.Component {
  constructor (props) {
    super(props)
    this.userId = ''
    this.id = ''
    this.state = {
      showWarning: false,
      renderChild: true
    }
    this.handleToggleClick = this.handleToggleClick.bind(this)
    this.handleChildUnmount = this.handleChildUnmount.bind(this)
  }
  handleChildUnmount () {
    this.setState({ renderChild: false })
  }

  handleToggleClick () {
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }))
  }

  componentDidMount () {
    this.userId = this.props.userId
    this._id = this.props._id
  }

  dismiss () {
    this.props.unmountMe()
  }

  render () {
    return (
      <div className='user-poll'>
        <Warning {...this.props} warn={this.state.showWarning} />
        <li>
          <Link style={link} to={`/details/${this.props.userId}/${this.props._id}`}>
            <span>
              {this.props.name}
            </span>
          </Link>

          {this.state.showWarning ? <button className='user-poll__cancel' onClick={this.handleToggleClick}>Cancel</button> : <button className='user-poll__delete' onClick={this.handleToggleClick}>Delete</button> }
        </li>
      </div>
    )
  }
}

PollItem.propTypes = {
  userId: string.isRequired,
  _id: string.isRequired,
  unmountMe: func.isRequired,
  name: string.isRequired
}

class UserPolls extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      renderChild: true
    }
    this.handleChildUnmount = this.handleChildUnmount.bind(this)
  }

  handleChildUnmount () {
    this.setState({ renderChild: false })
  }

  render () {
    return (
      <div>
        {this.state.renderChild ? <PollItem {...this.props} unmountMe={this.handleChildUnmount} /> : null}
      </div>
    )
  }
}

UserPolls.propTypes = {
  name: string.isRequired,
  _id: string.isRequired,
  userId: string.isRequired,
  unmountMe: func.isRequired
}

export default UserPolls
