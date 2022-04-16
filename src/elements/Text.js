import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { bold, color, size, children, margin, _onClick, textAlign, width, padding } =
    props;

  const styles = {
    bold: bold,
    color: color,
    size: size,
    margin,
    textAlign,
    width,
    padding,
  };

  return (
    <P {...styles} onClick={_onClick}>
      {children}
    </P>
  );
};

Text.defaultProps = {
  children: null,
  _onClick: () => {},
  bold: false,
  color: "#222831",
  size: "14px",
  margin: false,
  textAlign: "unset",
  width: 0,
  padding: 0,
};

const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  text-align: ${(props) => props.textAlign};
  ${(props) => (props.width ? `width: ${props.width};` : "")};

  ${(props) => (props.padding ? `padding: ${props.padding};` : "")};
`;

export default Text;
