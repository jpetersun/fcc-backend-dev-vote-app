const React = require('react')
const Layout = require('./Layout')
// const Details = require('./Details')
// const Landing = require('./Landing')
const { Router, browserHistory } = require('react-router')

if (typeof module !== 'undefined' && module.require) {
  if (typeof require.ensure === 'undefined') {
    require.ensure = require('node-ensure')
  }
}

const rootRoute = {
  component: Layout,
  path: '/',
  indexRoute: {
    getComponent (location, cb) {
      require.ensure([], () => {
        cb(null, require('./Landing'))
      })
    }
  },
  childRoutes: [
    {
      path: 'details/:id',
      getComponent (location, cb) {
        require.ensure([], () => {
          cb(null, require('./Details'))
        })
      }
    }
  ]
}

const App = React.createClass({
  render () {
    return (
      <Router history={browserHistory} routes={rootRoute} />
    )
  }
})

App.Routes = rootRoute
App.History = browserHistory

module.exports = App
