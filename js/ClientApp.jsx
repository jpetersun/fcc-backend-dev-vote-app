import React from 'react'
import Layout from './Layout'
import { Router, browserHistory } from 'react-router'
import Landing from './Landing'
import Details from './Details'
import CreatePoll from './CreatePoll'
import Login from './Login'
import Account from './Account'

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
        cb(null, Landing)
      })
    }
  },
  childRoutes: [
    {
      path: 'details/:userId/:id',
      getComponent (location, cb) {
        require.ensure([], () => {
          cb(null, Details)
        })
      }
    },
    {
      path: 'create-poll',
      getComponent (location, cb) {
        require.ensure([], () => {
          cb(null, CreatePoll)
        })
      }
    },
    {
      path: 'login',
      getComponent (location, cb) {
        require.ensure([], () => {
          cb(null, Login)
        })
      }
    },
    {
      path: 'account',
      getComponent (location, cb) {
        require.ensure([], () => {
          cb(null, Account)
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

export default App
