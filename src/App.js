import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'
import { withRouter, Redirect, Route, BrowserRouter, Switch } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import { Home, Login } from './pages'
import Colors from './statics/Colors'

const PrivateOnlyRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const token = Cookies.get('access_token')
      if (token) {
        return <Component {...props} />
      } else {
        return (
          <Redirect
            to={{
              pathname: '/'
            }}
          />
        )
      }
    }}
  />
)

const PublicOnlyRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={props => <Component {...props} />} />
}

class ScrollToTop extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }
  render() {
    return this.props.children
  }
}
const RoutedScroll = withRouter(ScrollToTop)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <RoutedScroll>
          <ThemeProvider theme={Colors}>
            <Switch>
              <PublicOnlyRoute exact path="/" component={Login} />
              <PrivateOnlyRoute path="/home" component={Home} />
            </Switch>
          </ThemeProvider>
        </RoutedScroll>
      </BrowserRouter>
    )
  }
}

export default App
