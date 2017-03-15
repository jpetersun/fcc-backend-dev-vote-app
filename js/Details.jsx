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
            '#FF6384',
            '#36A2EB'
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB'
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
    // console.log(name)
    // console.log(id)
    axios.post(`/poll-results/${this.props.params.userId}/${this.props.params.id}`, {
      name: name,
      _id: id
    })
    .then((response) => {
      axios.get(`/polls/${this.props.params.userId}/${this.props.params.id}`)
      .then((response) => {
        // console.log(response)
        const data = response.data[0]
        // const firstOption = response.data[0].options[0].name
        this.setState({chartData:
        {
          labels: [
            data.options[0].name,
            data.options[1].name
          ],
          datasets: [{
            data: [
              data.options[0].votes,
              data.options[1].votes
            ],
            backgroundColor: [
              '#FF6384',
              '#36A2EB'
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB'
            ]
          }]
        }
        })
        this.refs.canvas.chart_instance.update()
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
        const firstOption = data.options[0].name
        this.value = firstOption
        this.setState({ pollData: response.data[0] })
        this.setState({chartData:
        {
          labels: [
            data.options[0].name,
            data.options[1].name
          ],
          datasets: [{
            data: [
              data.options[0].votes,
              data.options[1].votes
            ],
            backgroundColor: [
              '#FF6384',
              '#36A2EB'
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB'
            ]
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
