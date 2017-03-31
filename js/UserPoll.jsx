const React = require('react')
const { Link } = require('react-router')
const axios = require('axios')

const link = {
  color: '#000'
}

const button = {
  display: 'inline-block',
  float: 'right'
}
class UserPoll extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.userId = ''
    this.id = ''
  }
  handleClick (e) {
    axios.delete(`/user-poll/${this.userId}/${this._id}`)
      .then((response) => {
        response
      })
      .catch((error) => {
        console.error('axios error', error)
      })
  }
  componentDidMount () {
    this.userId = this.props.userId
    this._id = this.props._id
  }
  render () {
    return (
      <div>
        <li>
          <Link style={link} to={`/details/${this.props.userId}/${this.props._id}`}>
            <span>
              {this.props.name}
            </span>
          </Link>
          <button style={button} onClick={this.handleClick}>Delete Poll</button>
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
