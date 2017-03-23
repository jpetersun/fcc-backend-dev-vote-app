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
            this.randyColor1,
            '#36A2EB'
          ]
        }]
      }
    }
    this.value = ''
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.randyColors = []
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
          this.setState({chartData:
          {
            labels: labels,
            datasets: [{
              data: votes,
              backgroundColor: this.randyColors
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
        for (let i = 0; i < data.options.length; i += 1) {
          this.randyColors.push('#' + (Math.random() * 0xFFFFFF << 0).toString(16))
        }
        // console.log(this.randyColors)
        const labels = data.options.map(option => option.name)
        const votes = data.options.map(option => option.votes)
        const firstOption = data.options[0].name
        this.value = firstOption
        this.setState({ pollData: data })
        this.setState({chartData:
        {
          labels: labels,
          datasets: [{
            data: votes,
            backgroundColor: this.randyColors
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
            <select onChange={this.handleChange} name='selectpicker'>
              {this.state.pollData.options.map((option) => (
                <PollOption {...option} key={option._id} />
              ))}
            </select>
          </label>
          <input type='submit' value='Submit' />
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
