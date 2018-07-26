import React from 'react'

export const PollOption = (props) => {
  return (
    <option value={props.name} name={props.name}>{props.name}</option>
  )
}

const { string } = React.PropTypes

PollOption.propTypes = {
  name: string.isRequired,
  _id: string.isRequired
}

