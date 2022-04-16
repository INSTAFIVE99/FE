import React from "react";
import styled from "styled-components";
import { Text, Grid } from "./index";

const Input = (props) => {
  const {
    label,
    placeholder,
    _onChange,
    type,
    multiLine,
    value,
    maxLength,
    border,
    resize,
    radius,
    height,
    onblur,
  } = props;

  if (multiLine) {
    return (
      <Grid>
        <Text margin="0px">{label}</Text>
        <ElTextarea
          rows={10}
          placeholder={placeholder}
          onChange={_onChange}
          type={type}
          value={value}
          border={border}
          resize={resize}
          radius={border-radius}
        ></ElTextarea>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid>
        <Text margin="0">{label}</Text>
        <ElInput
          onblur={onblur}
          height={height}
          type={type}
          placeholder={placeholder}
          onChange={_onChange}
          maxLength={maxLength}
          border={border}
          radius={radius}
        />
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  label: "텍스트",
  placeholder: "입력해",
  type: "text",
  _onChange: () => {},
  multiLine: false,
  value: "",
  maxLength: "",
  border: "",
  resize: "none",
  radius:"20px",
  defaultValue:""
};

const ElInput = styled.input`
  border: 1px solid #212121;
  ${(props) => (props.radius ? `border-radius: ${props.radius};` : "")};
  width: 100%;
  ${(props) => (props.height ? `height: ${props.height};` : "")};
  padding: 12px 4px;
  box-sizing: border-box;
  ${(props) => (props.border ? `border: ${props.border};` : "")};
  &:focus {
    border: none;
  }
`;

const ElTextarea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
  ${(props) => (props.border ? `border: ${props.border};` : "")};
`;

export default Input;
