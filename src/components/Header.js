import React from "react";
import styled from "styled-components";
import { Grid, Input, Image } from "../elements/index";
import icon01 from "../imgs/header/header_01.png";
import icon02 from "../imgs/header/header_02.png";
import icon03 from "../imgs/header/header_03.png";
import icon04 from "../imgs/header/header_04.png";
import icon05 from "../imgs/header/header_05.png";
import logo from "../imgs/header/header_logo.png";

import { history } from "../redux/configureStore";

const Header = (props) => {
  const postAdd = () => {
    history.push(`/postImage`);
  };

  if (window.location.pathname === "/") return null;

  return (
    <Nav>
      <Grid width="935px">
        <Grid is_flex>
          <Grid is_flex>
            <img
              src={logo}
              alt="logo"
              onClick={() => {
                history.push("/postList");
              }}
            />
          </Grid>
          {/* <Input></Input> */}
          <Grid flex justify="end" alignItems="center">
            <Icon src={icon01}></Icon>
            <Icon src={icon02}></Icon>
            <Icon src={icon03} onClick={postAdd}></Icon>
            <Icon src={icon04}></Icon>
            <Icon src={icon05} style={{ position: "relative" }}></Icon>
            <Image shape="circle" size="24" paddingLeft="20px"></Image>
          </Grid>
        </Grid>
      </Grid>
    </Nav>
  );
};

const Nav = styled.div`
  width: 100vw;
  height: 59px;
  border-bottom: 1px solid #dbdbdb;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  z-index: 10;
  position: fixed;
`;
const Icon = styled.img`
  width: 22px;
  height: 22px;
  margin-right: 20px;
  cursor: pointer;
`;

export default Header;
