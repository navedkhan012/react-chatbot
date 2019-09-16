import React, { Component } from 'react'
import styled, { withTheme } from 'styled-components'
import Icon from './Icon'
import { Error } from './StyledComponents'
const TextFieldWrapper = styled.div`
  position: relative;
  margin: ${props => (props.margin ? props.margin : '20px 0')};
  width: ${props => (props.width ? props.width : '100%')};
`
const InputView = styled.input`
  position: relative;
  z-index: 1;
  width: ${props => (props.width ? props.width : '100%')};
  height: 35px;
  font-size: ${props => (props.fontSize ? props.fontSize : '14px')};
  color: ${props => props.fontColor || props.fontColor};
  border: none;
  border-bottom: ${props => (props.value && props.value !== '' ? '2px' : '1px')} solid
    ${props => (props.value && props.value !== '' ? props.labelColor : props.theme.secondary)};
  background: transparent;
  &:hover {
    border-width: 2px;
    border-color: ${props => (props.hoverColor ? props.hoverColor : props.theme.secondary)};
    + label {
      font-weight: 600;
    }
  }
  ${props =>
    props.disabled &&
    `
  
  color:rgba(0, 0, 0, 0.38);
  border-bottom: 2px solid rgba(0, 0, 0, 0.38);
  &+label{
    color:rgba(0, 0, 0, 0.38) !important;
  }
  `};
  ${props =>
    props.error &&
    `
  
  color: ${props => (props.value && props.value !== '' ? props.labelColor : props.theme.secondary)};
  border-bottom: 2px solid #f44336;
  &+label{
    color:#f44336 !important;
  }
  &:focus{
    border-color:#f44336 !important;
  }
  `};
  & + label {
    position: absolute;
    left: 0;
    top: 10px;
    bottom: 4px;
    color: ${props => (props.value && props.value !== '' ? props.labelColor : props.theme.secondary)};
    font-size: 16px;
    transition: 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
  &:focus {
    outline: none;
    border-width: 2px;
    border-color: ${props => (props.labelColor ? props.labelColor : props.theme.primary)};
    & + label {
      top: -15px;
      color: ${props => (props.labelColor ? props.labelColor : props.theme.primary)};
      font-size: 14px;
      font-weight: 600;
      position: absolute;
      left: 0;
      transition: 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }
  }
  ${props =>
    props.value &&
    props.value !== '' &&
    `
  & + label{
    top: -15px;
    color: ${props => (props.labelColor ? props.labelColor : props.theme.primary)};
    font-size: 14px;
    font-weight: 600;
    position: absolute;
    left: 0;
    transition: 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
  `};
`
const Label = styled.label``
const IconView = styled.div`
  position: absolute;
  right: 0;
  top: 4px;
  cursor: pointer;
  z-index: 9;
`

class TextField extends Component {
  state = { showPassword: false }
  render() {
    const {
      theme,
      value,
      width,
      margin,
      error,
      labelColor,
      noHover,
      hoverColor,
      label,
      disabled,
      type,
      fontSize,
      hideEye,
      fontColor,
      ...props
    } = this.props
    const { showPassword } = this.state
    return (
      <TextFieldWrapper width={width} margin={margin}>
        <InputView
          value={value}
          labelColor={labelColor}
          hoverColor={hoverColor}
          noHover={noHover}
          error={error}
          disabled={disabled}
          fontSize={fontSize}
          fontColor={fontColor}
          type={type ? (showPassword ? 'text' : type) : 'text'}
          {...props}
        />
        <Label>{label}</Label>
        {type === 'password' && !hideEye ? (
          <IconView onClick={() => this.setState({ showPassword: !showPassword })}>
            <Icon icon={showPassword ? 'passwordHide' : 'passwordShow'} />
          </IconView>
        ) : null}
        {error && <Error>{error}</Error>}
      </TextFieldWrapper>
    )
  }
}

export default withTheme(TextField)
