const React = require('react')
const Layout = require('./Layout')
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
      path: 'details/:userId/:id',
      getComponent (location, cb) {
        require.ensure([], () => {
          cb(null, require('./Details'))
        })
      }
    },
    {
      path: 'create-poll',
      getComponent (location, cb) {
        require.ensure([], () => {
          cb(null, require('./CreatePoll'))
        })
      }
    },
    {
      path: 'login',
      getComponent (location, cb) {
        require.ensure([], () => {
          cb(null, require('./Login'))
        })
      }
    },
    {
      path: 'account',
      getComponent (location, cb) {
        require.ensure([], () => {
          cb(null, require('./Account'))
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
