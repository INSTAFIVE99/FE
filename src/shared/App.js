import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";


import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Header from "../components/Header";
import PostList from "../pages/PostList";
import PostImage from "../pages/PostImage";
import PostWrite from "../pages/PostWrite";
import PostDetail from "../pages/PostDetail";
import PostModify from "../pages/PostModify";



function App() {


  return (
    <React.Fragment>
        <Header></Header>
        
          <ConnectedRouter history={history}>
             <Route path="/" exact component={Login}/>
             <Route path="/signUp" exact component={SignUp}/>

             <Route path="/postList" component={PostList} />
             <Route path="/postImage" component={PostImage} />
             <Route path="/postAdd" component={PostWrite} />
             <Route path="/detail/:id" exact component={PostDetail} />

             <Route path="/postModify/:id" exact component={PostModify} />
          </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;

