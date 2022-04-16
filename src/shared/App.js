import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { Grid } from "../elements";
import styled from "styled-components";
// import Header from "../components/Header";
// import PostList from "../pages/PostList";
// import PostDetail from "../pages/PostDetail";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";


function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    // dispatch(useActions.loginCheck());
  }, []);

  return (
    <React.Fragment>
        <Grid>
          <ConnectedRouter history={history}>
            <Route path="/" exact component={Login}/>
            <Route path="/signUp" exact component={SignUp}/>
          </ConnectedRouter>
        </Grid>
    </React.Fragment>
  );
}

export default App;
