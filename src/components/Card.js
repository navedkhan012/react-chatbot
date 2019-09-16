import React from 'react'
import styled from 'styled-components'

const CardWrapper = styled.div`
  background-color: #fff;
  border-radius: 2px;
  width: 100%;
  max-width: ${props => (props.maxWidth ? props.maxWidth : '100%')};
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25), 0 8px 16px -8px rgba(0, 0, 0, 0.3),
    0 -6px 16px -6px rgba(0, 0, 0, 0.025);
  padding: ${props => (props.viewPadding ? props.viewPadding : '0px')};
  margin: ${props => (props.viewMargin ? props.viewMargin : '0px')};
  min-height: ${props => (props.minHeight ? props.minHeight : 'auto')};
`

const Card = props => {
  const { children } = props
  return <CardWrapper {...props}>{children}</CardWrapper>
}

export default Card
