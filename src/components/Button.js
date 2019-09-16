import React from 'react'
import styled, { keyframes, withTheme } from 'styled-components'

const ButtonWrapper = styled.button`
  padding: 0 30px;
  width: ${props => props.width || 'auto'};
  height: 40px;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.labelColor || '#fff'};
  background-color: ${props => props.backgroundColor || props.theme.primary};
  border: none;
  border-radius: ${props => props.borderRadius || '2px'};
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
    transform: translate(0, -0.5px);
  }
  &:focus {
    box-shadow: 0 0 0 2px #fff, 0 0 0 3px ${props => (props.bgColor ? props.bgColor : props.theme.primary)};
    outline: none;
  }
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  box-shadow: ${props => (props.disabled ? '0 3px 6px 0 rgba(0, 0, 0, 0.16)' : 'none')};
  ${props =>
    props.disabled &&
    `
      background-color: #a0b7bf !important;
      border: none;
      color: #fff;
    `};
  background: ${props => props.bgColor || props.bgColor};
`

const spin = keyframes`
0% { transform: rotate(0deg) }
100% {transform: rotate(360deg) }
`
const Circle = styled.div`
  border: 3px solid ${props => (props.loadingBgColor ? props.loadingBgColor : '#fff')};
  border-top: 3px solid ${props => (props.loadingFgColor ? props.loadingFgColor : props.theme.primary)};
  border-radius: 50%;
  margin: auto;
  width: 20px;
  height: 20px;
  animation: ${spin} 2s linear infinite;
`

const Button = props => {
  const {
    width,
    social,
    labelColor,
    backgroundColor,
    label,
    isLoading,
    borderRadius,
    bgColor,
    disabled,
    padding,
    fontSize
  } = props
  return (
    <ButtonWrapper
      backgroundColor={backgroundColor}
      labelColor={labelColor}
      borderRadius={borderRadius}
      bgColor={bgColor}
      width={width}
      disabled={disabled}
      padding={padding}
      fontSize={fontSize}
      {...props}>
      {social ? <React.Fragment>{label}</React.Fragment> : isLoading ? <Circle /> : label}
    </ButtonWrapper>
  )
}

export default withTheme(Button)
