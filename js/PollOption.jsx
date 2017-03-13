const React = require('react')
const PollOption = (props) => {
  // console.log(props)
  return (
    <option value={props.name} name={props.name}>{props.name}</option>
  )
}

const { string } = React.PropTypes

PollOption.propTypes = {
  name: string.isRequired,
  _id: string.isRequired
}
module.exports = PollOption