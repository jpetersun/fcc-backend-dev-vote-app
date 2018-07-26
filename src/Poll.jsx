import React from 'react'
import { Link } from 'react-router'

const linkStyle = {
  color: '#000'
}

const Poll = (props) => {
  return (
    <Link style={linkStyle} to={`/details/${props.userId}/${props._id}`}>
      <li className=''>
        <span className=''>
          {props.name}
        </span>
      </li>
    </Link>
  )
}

const { string } = React.PropTypes

Poll.propTypes = {
  name: string.isRequired,
  _id: string.isRequired,
  userId: string.isRequired
}

export default Poll
