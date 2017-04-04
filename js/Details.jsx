const React = require('react')
const PollOption = require('./PollOption')
const axios = require('axios')
const _ = require('lodash')

if (typeof window === 'undefined') {
  global.window = {}
}

const Doughnut = require('react-chartjs-2').Doughnut
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
      }
    }
    this.value = ''
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.value = event.target.value
  }
  handleSubmit (event) {
    const value = this.value
    const obj = _.find(this.state.pollData.options, {name: value})
    const name = obj.name
    const id = obj._id
    axios.post(`/poll-results/${this.props.params.userId}/${this.props.params.id}`, {
      name: name,
      _id: id
    })
    .then((response) => {
      if (typeof response.data === 'string') {
        window.alert(response.data)
      }
      axios.get(`/polls/${this.props.params.userId}/${this.props.params.id}`)
        .then((response) => {
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
    event.preventDefault()
  }

  componentDidMount () {
    axios.get(`/polls/${this.props.params.userId}/${this.props.params.id}`)
      .then((response) => {
        const data = response.data[0]
        // console.log(data)
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
        <Doughnut ref='canvas' data={this.state.chartData} />
        <form onSubmit={this.handleSubmit} method='post' action='/poll-results'>
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
module.exports = Details
