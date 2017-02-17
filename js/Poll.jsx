const React = require('react')
const { Link } = require('react-router')

const Poll = (props) => (
  <Link to='/#'>
    <li className='mdl-list__item'>
      <span className='mdl-list__item-primary-content'>
        {props.name}
      </span>
    </li>
  </Link>
)

const { string } = React.PropTypes

Poll.propTypes = {
  name: string.isRequired
}

module.exports = Poll
