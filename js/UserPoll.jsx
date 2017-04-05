const React = require('react')
const { Link } = require('react-router')
const axios = require('axios')

const link = {
  color: '#000'
}

class Warning extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  handleClick (e) {
    console.log(this.props)
    console.log('clicked')
  }

  handleDelete (e) {
    axios.delete(`/user-poll/${this.props.userId}/${this.props._id}`)
      .then((response) => {
        response
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
        Delete Poll?
        <div>
          <span className='delete' onClick={this.handleDelete}>Delete</span>
        </div>
      </div>
    )
  }
}

class UserPoll extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.userId = ''
    this.id = ''
    this.state = {
      showWarning: false
    }
    this.handleToggleClick = this.handleToggleClick.bind(this)
  }

  handleToggleClick () {
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }))
  }

  handleClick (e) {
    // axios.delete(`/user-poll/${this.userId}/${this._id}`)
    //   .then((response) => {
    //     response
    //   })
    //   .catch((error) => {
    //     console.error('axios error', error)
    //   })
    console.log('clicked')
  }
  componentDidMount () {
    this.userId = this.props.userId
    this._id = this.props._id
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

const { string } = React.PropTypes

UserPoll.propTypes = {
  name: string.isRequired,
  _id: string.isRequired,
  userId: string.isRequired
}

module.exports = UserPoll
