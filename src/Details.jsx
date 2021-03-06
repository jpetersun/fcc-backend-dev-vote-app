const React = require('react')
import { PollOption } from './PollOption'
const axios = require('axios')
const _ = require('lodash')

if (typeof window === 'undefined') {
  global.window = {}
}

const Doughnut = require('react-chartjs-2').Doughnut

function WarningBanner (props) {
  if (!props.warn) {
    return null
  }

  const warningStyle = {
    margin: '1rem auto',
    color: 'crimson',
    border: '1px solid crimson',
    backgroundColor: 'white',
    position: 'relative'
  }

  return (
    <div className='warning' style={warningStyle}>
      You already voted
    </div>
  )
}

const { bool } = React.PropTypes

WarningBanner.propTypes = {
  warn: bool
}

class Details extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      pollData: {
        name: '',
        options: [
          {name: '', _id: '1'},
          {name: '', _id: '2'}
        ]
      },
      chartData: {
        labels: [
          'Red',
          'Blue'
        ],
        datasets: [{
          data: ['', ''],
          backgroundColor: [
            '',
            ''
          ]
        }]
      },
      showWarning: false
    }
    this.value = ''
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.value = event.target.value
  }

  handleSubmit (event) {
    event.preventDefault()
    // Check if user voted on this poll using localStorage
    if (window.localStorage.getItem(`${this.props.params.id}`) === 'voted') {
      this.setState({ showWarning: true })
      return null
    }

    const value = this.value
    const obj = _.find(this.state.pollData.options, {name: value})
    const name = obj.name
    const id = obj._id

    axios.put(`/poll-results/${this.props.params.userId}/${this.props.params.id}`, {
      name: name,
      _id: id
    })
    .then((response) => {
      // second fetch to update doughtnut chart view
      axios.get(`/polls/${this.props.params.userId}/${this.props.params.id}`)
        .then((response) => {
          // Use localStorage to set which poll the user has been voted on
          window.localStorage.setItem(`${this.props.params.id}`, 'voted')

          const data = response.data[0]
          const labels = data.options.map(option => option.name)
          const votes = data.options.map(option => option.votes)
          const colors = data.options.map(option => option.color)
          this.setState({chartData:
          {
            labels: labels,
            datasets: [{
              data: votes,
              backgroundColor: colors
            }]
          }
          })
        })
      .catch((error) => {
        console.error('axios error', error)
      })
    })
    .catch((error) => {
      console.error('axios error', error)
    })
  }

  componentDidMount () {
    axios.get(`/polls/${this.props.params.userId}/${this.props.params.id}`)
      .then((response) => {
        const data = response.data[0]
        const labels = data.options.map(option => option.name)
        const votes = data.options.map(option => option.votes)
        const colors = data.options.map(option => option.color)
        const firstOption = data.options[0].name
        this.value = firstOption
        this.setState({ pollData: data })
        this.setState({chartData:
        {
          labels: labels,
          datasets: [{
            data: votes,
            backgroundColor: colors
          }]
        }
        })
      })
      .catch((error) => {
        console.error('axios error', error)
      })
  }

  render () {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <Doughnut ref='canvas' data={this.state.chartData} />
        <form onSubmit={this.handleSubmit} method='put' action='/poll-results'>
          <label>
            <p>Pick your favorite: {this.state.pollData.name}</p>
            <select className='details__select' onChange={this.handleChange} name='selectpicker'>
              {this.state.pollData.options.map((option) => (
                <PollOption {...option} key={option._id} />
              ))}
            </select>
          </label>
          <input className='details__submit' type='submit' value='Submit' />
        </form>
      </div>
    )
  }
}

const { object } = React.PropTypes

Details.propTypes = {
  params: object,
  pollData: object
}

export default Details
