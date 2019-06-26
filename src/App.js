import React, { useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Cookies from 'js-cookie'
import { BrowserRouter as Router, Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { has } from 'lodash'
import qs from 'qs'
import axios from 'axios'
import Colors from './statics/Colors'

import { LoginAndSignup } from './pages/Authentication'

const PrivateOnlyRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      // check params for access token for google and github signup
      const urlparams = qs.parse(props.location.search.slice(1))
      console.log('urlparams', urlparams)
      if (has(urlparams, 'access_token')) {
        Cookies.set('access_token', urlparams.access_token, { path: '/' })
        axios.defaults.headers['Authorization'] = `Token ${urlparams.access_token}`
        return <Redirect to={{ pathname: '/' }} />
      } else {
        const token = Cookies.get('access_token')
        axios.defaults.headers['Authorization'] = `Token ${Cookies.get('access_token')}`
        if (token) {
          return <Component {...props} />
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          )
        }
      }
    }}
  />
)
const PublicOnlyRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={props => <Component {...props} />} />
}
function ScrollToTop({ history }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0)
    })
    return () => {
      unlisten()
    }
  }, [history])

  return null
}

const RoutedScroll = withRouter(ScrollToTop)

function App() {
  return (
    <Router>
      <RoutedScroll />
      <ThemeProvider theme={Colors}>
        <Switch>
          <PublicOnlyRoute exact path="/" component={LoginAndSignup} />
        </Switch>
      </ThemeProvider>
    </Router>
  )
}

export default App
