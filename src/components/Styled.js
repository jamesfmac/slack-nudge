import styled from "styled-components";
import Table from 'react-bootstrap/Table'
import { Container } from "react-bootstrap";

export const Heading = styled.h3`
  width: 100%;
  text-align: left;
  font-weight: 300;
  margin-bottom: 20px
`;

export const StyledTable = styled(Table).attrs({
  className: "table",
})`
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
padding: 2px;
padding-top: 20px;
padding-left: 20px;
padding-right: 20px;
margin-bottom: 10px;
border-radius: 4px;

`

export const StyledGroup = styled.div`
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
  padding: 2px;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 10px;
  border-radius: 4px;
  border-top: 2px solid #007bff;
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
