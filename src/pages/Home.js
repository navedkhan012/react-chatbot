import React, { Component } from 'react'
import styled, { withTheme } from 'styled-components'
import { FlexWrapper, StyledText, FormikForm, Icon } from '../components'
import Cookies from 'js-cookie'
import { Formik, Field } from 'formik'
import Colors from '../statics/Colors'
import { isEmpty } from 'lodash'

const StyledInput = styled.input`
  width: 100%;
  height: 60px;
  border-radius: 30px;
  outline: none;
  border: none;
  padding: 0 80px 0 24px;
  box-shadow: 0px 8px 8px 0px #9e9e9e;
`
const SendButton = styled.button`
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background: ${props => (props.disabled ? '#ddd' : props.theme.primary)};
  position: absolute;
  right: 20px;
  top: 7px;
  cursor: pointer;
  outline: none;
  transition: all 0.2s;
  :hover {
    box-shadow: 0px 2px 8px #2721f3;
  }
`
const MessageTuple = props => {
  const { type, message } = props
  return (
    <FlexWrapper
      width="auto"
      background={type === 'sent' ? Colors.primary : '#fff'}
      viewPadding="14px 20px"
      viewMargin="5px 4px"
      borderRadius="20px"
      style={{
        alignSelf: type === 'sent' && 'flex-end',
        boxShadow: 'rgb(158, 158, 158) 0px 2px 6px',
        borderTopRightRadius: type === 'sent' && '0px',
        borderTopLeftRadius: type !== 'sent' && '0px'
      }}>
      <StyledText color={type === 'sent' ? '#fff' : undefined}>{message}</StyledText>
      <StyledText color={type === 'sent' ? '#fff' : undefined} fontSize="10px" viewPadding="8px 0 0 0">
        12:30 PM
      </StyledText>
    </FlexWrapper>
  )
}

class Home extends Component {
  state = {
    websocket: new WebSocket('wss://echo.websocket.org/'),
    messageData: []
  }
  handleLogout = () => {
    Cookies.remove('access_token')
    this.props.history.push('/')
  }
  componentDidMount() {
    this.testWebSocket()
  }
  testWebSocket = () => {
    const { websocket } = this.state

    websocket.onopen = evt => {
      this.onOpen(evt)
    }
    /* 
    websocket.onclose = evt => {
      this.onClose(evt)
    } */
    websocket.onmessage = evt => {
      this.onMessage(evt)
    }
    websocket.onerror = evt => {
      this.onError(evt)
    }
  }

  onOpen = evt => {
    console.log('CONNECTED')
  }

  onClose = evt => {
    console.log('DISCONNECTED')
  }

  onMessage = evt => {
    const { messageData } = this.state
    this.setState({ messageData: [...messageData, { key: 'received', message: evt.data }] })
    // websocket.close()
  }

  onError = evt => {
    console.log(evt.data)
  }

  doSend = message => {
    const { websocket, messageData } = this.state
    websocket.send(message)
    this.setState({ messageData: [...messageData, { key: 'sent', message }] })
  }

  render() {
    const { theme } = this.props
    const { messageData } = this.state
    return (
      <FlexWrapper height="100%">
        <FlexWrapper
          viewPadding="10px 20px"
          height="60px"
          background={theme.primary}
          alignItems="center"
          justifyContent="space-between"
          direction="row">
          <StyledText color="#fafafa" fontWeight={700}>
            React ChatBot
          </StyledText>
          <StyledText color="#fafafa" fontWeight={600} style={{ cursor: 'pointer' }} onClick={this.handleLogout}>
            Logout
          </StyledText>
        </FlexWrapper>
        <FlexWrapper height="100%" background="#f5f5f5" viewPadding="30px 20px">
          <FlexWrapper height="100%" viewMargin="0 4px 0 0" style={{ overflow: 'auto' }}>
            {!isEmpty(messageData) &&
              messageData.map((item, index) => {
                return <MessageTuple key={index} type={item.key === 'sent' && 'sent'} message={item.message} />
              })}
          </FlexWrapper>
          <Formik
            enableReinitialize
            initialValues={{
              message: ''
            }}
            validate={values => {
              let errors = {}
              if (!values.message) {
                errors.message = 'Required'
              }
              return errors
            }}
            validateOnChange
            onSubmit={(val, { resetForm }) => {
              this.doSend(val.message)
              resetForm()
            }}
            render={formikBag => (
              <FormikForm style={{ position: 'relative' }}>
                <Field
                  name="message"
                  render={({ field }) => (
                    <StyledInput
                      {...field}
                      // id="noWhiteSpaceAtTheStart"
                      autoComplete="off"
                      required
                      placeholder="type your message here"></StyledInput>
                  )}
                />
                <SendButton type="submit" disabled={isEmpty(formikBag.values.message)} onClick={formikBag.onSubmit}>
                  <Icon icon="sendButton" />
                </SendButton>
              </FormikForm>
            )}
          />
        </FlexWrapper>
      </FlexWrapper>
    )
  }
}

export default withTheme(Home)
