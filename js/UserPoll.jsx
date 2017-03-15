const React = require('react')
const { Link } = require('react-router')
const axios = require('axios')
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
        <Link to={`/details/${this.props.userId}/${this.props._id}`}>
          <li className='mdl-list__item'>
            <span className='mdl-list__item-primary-content'>
              {this.props.name}
            </span>
          </li>
        </Link>
        <button onClick={this.handleClick}>Delete Poll</button>
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
