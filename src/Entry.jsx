import React from 'react'
import ReactDOM from 'react-dom'
import App from './ClientApp'
import { match } from 'react-router'

match({ history: App.History, routes: App.Routes }, (error, redirectLocation, renderProps) => {
  if (error) {
    return console.error('BrowserEntry error', error)
  }
  ReactDOM.render(<App {...renderProps} />, document.getElementById('app'))
})
