const React = require('react')
const { Link } = require('react-router')

const Poll = (props) => {
  return (
    <Link to={`/details/${props._id}`}>
      <li className='mdl-list__item'>
        <span className='mdl-list__item-primary-content'>
          {props.name}
        </span>
      </li>
    </Link>
  )
}

const { string } = React.PropTypes

Poll.propTypes = {
  name: string.isRequired,
  _id: string.isRequired
}

module.exports = Poll
