import React, { Component } from 'react'
import styled, { withTheme } from 'styled-components'
import { FlexWrapper, Card, TextField, Button, FormikForm, StyledText } from '../components'
import { Formik, Field } from 'formik'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {}

  handleSubmit = values => {
    if (values.username === 'saurav' && values.password === '123') {
      Cookies.set('access_token', '#46d35f671bb1b1u1881')
      this.props.history.push('/home')
    }
  }
  render() {
    return (
      <FlexWrapper background="#f5f5f5" height="100%" alignItems="center" justifyContent="center">
        <StyledText fontSize="26px" fontWeight={700} viewPadding="0 0 20px 0">
          Welcome to React Chatbot
        </StyledText>
        <Card maxWidth="450px" viewPadding="16px">
          <Formik
            enableReinitialize
            initialValues={{
              username: 'saurav',
              password: '123'
            }}
            validateOnChange
            onSubmit={this.handleSubmit}
            render={formikBag => (
              <FormikForm>
                <Field
                  name="username"
                  render={({ field }) => (
                    <TextField {...field} type="text" label="Username" required error={formikBag.errors.username} />
                  )}
                />
                <Field
                  name="password"
                  render={({ field }) => (
                    <TextField {...field} type="password" label="Password" required error={formikBag.errors.password} />
                  )}
                />

                <Button width="100%" label="Login" />
              </FormikForm>
            )}
          />
        </Card>
      </FlexWrapper>
    )
  }
}

export default Login
