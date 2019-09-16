import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Colors from '../statics/Colors'
import { Form } from 'formik'

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: ${props => (props.direction ? props.direction : 'column')};
  justify-content: ${props => (props.justifyContent ? props.justifyContent : 'flex-start')};
  align-items: ${props => (props.alignItems ? props.alignItems : 'flex-start')};
  margin: ${props => (props.viewMargin ? props.viewMargin : '0px')};
  padding: ${props => (props.viewPadding ? props.viewPadding : '0px')};
  flex-basis: ${props => (props.flexBasis ? props.flexBasis : 'auto')};
  height: ${props => (props.height ? props.height : 'auto')};
  width: ${props => (props.width ? props.width : '100%')};
  min-width: ${props => (props.minWidth ? props.minWidth : 'auto')};
  border: ${props => (props.border ? props.border : 'none')};
  background: ${props => (props.background ? props.background : 'transparent')};
  flex-wrap: ${props => (props.flexWrap ? props.flexWrap : 'nowrap')};
  border-radius: ${props => (props.borderRadius ? props.borderRadius : '0')};
  position: ${props => (props.position ? props.position : 'static')};
  box-shadow: ${props => props.boxShadow || 'none'};
`

const StyledImage = styled.img`
  width: ${props => props.width || 'auto'};
  max-width: ${props => props.maxWidth || 'initial'};
  height: ${props => props.height || 'auto'};
  object-fit: ${props => props.objectFit || 'cover'};
`

const StyledText = styled.p`
  width: ${props => props.width || 'auto'};
  font-size: ${props => props.fontSize || '16px'};
  color: ${props => props.color || '#000'};
  line-height: normal;
  font-weight: ${props => props.fontWeight || 'normal'};
  background-color: ${props => props.background || 'transparent'};
  text-align: ${props => props.textAlign || 'left'};
  letter-spacing: ${props => props.letterSpacing || '0.6px'};
  padding: ${props => props.viewPadding || '0px'};
  text-decoration-line: ${props => props.textDecorationLine || 'none'};
`
const StyledLink = styled(Link)`
  font-size: 14px;
  padding: ${props => props.viewPadding || '0'};
  color: ${props => props.color || Colors.primary};
  transition: 0.2s linear;
  font-weight: ${props => props.fontWeight || 500};
  :hover {
    color: ${props => props.hoverColor || Colors.primary};
    text-decoration: none;
  }
`
const Error = styled.p`
  position: absolute;
  left: 0px;
  top: 35px;
  color: #f44336;
  font-size: 12px;
  ${props =>
    props.response &&
    `
  position: static;
  color: #f44336;
  font-size: 16px;
  text-align: center;
  text-transform: capitalize;
  padding-top: 6px;
  `};
  ${props =>
    props.styleType === 'select' &&
    `
    left: 24px;
    top: 50px;
  `};
`

const FormikForm = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
`
export { StyledText, FlexWrapper, StyledImage, StyledLink, Error, FormikForm }
