import styled from "styled-components";
import Table from 'react-bootstrap/Table'
import { Container, Row } from "react-bootstrap";

export const Heading = styled.h3`
  width: 100%;
  text-align: left;
  font-weight: 300;
  margin-bottom: 20px
`;

export const StyledTable = styled(Table).attrs({
  className: "table",
})`

padding: 2px;
padding-top: 20px;
padding-left: 20px;
padding-right: 20px;
margin-bottom: 10px;
border-radius: 4px;
`
;

;


export const StyledGroup = styled.div`
 
  padding: 2px;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 10px;
  

`;

export const StyledForm = styled.div`
  
  padding: 2px;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 10px;
  border-radius: 4px;

`;

export const StyledContainer = styled(Container).attrs({
  className: "container",
})`
  color: rgba(0, 0, 0, 0.87);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.75;
  letter-spacing: 0.00938em;
  font-family: Roboto, Helvetica, Arial, sans-serif ;

`;


export const StyledHeader= styled(Row).attrs({
className: "row"
})`

background-color: #f8f9fa!important;
padding: .5rem 1rem;
    padding-top: 0.5rem;
    padding-right: 1rem;
    padding-bottom: 0.5rem;
    padding-left: 1rem;

`