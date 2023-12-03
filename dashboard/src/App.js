import React, { useEffect } from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Login from "./screens/LoginScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";
import { useDispatch, useSelector } from "react-redux";
import { listRequests } from "./Redux/Actions/RequestActions";
import RequestScreen from "./screens/RequestScreen";
import ForgotPassword from "./screens/ForgotPassword";
import ResetPassword from "./screens/ResetPassword";
import ProfileScreen from "./screens/ProfileScreen";
import NewRequestScreen from "./screens/NewRequestScreen";
import RequestDetailleScreen from "./screens/RequestDetailleScreen";
import UserListScreen from "./screens/Admin/UserListScreen";
import { listUser } from "./Redux/Actions/AdminAction";

function App() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    
    if (userInfo) {
      dispatch(listRequests());
      dispatch(listUser);
    }
  }, [dispatch, userInfo]);

  return (
    <>
      <Router>
        <Switch>
          <PrivateRouter path="/" component={HomeScreen} exact />

          <PrivateRouter path="/demandes" component={RequestScreen} />
          <PrivateRouter path="/demande/add" component={NewRequestScreen} />

          <PrivateRouter path="/demande/:id" component={RequestDetailleScreen} />

          <PrivateRouter path="/account" component={ProfileScreen} />
          <PrivateRouter path="/users" component={UserListScreen} />
        

          <Route path="/login" component={Login} />

          <Route path="/password/forgot" component={ForgotPassword} />
          <Route path="/password/reset/:id" component={ResetPassword} />


          <PrivateRouter path="*" component={NotFound} />
  
        </Switch>
      </Router>
    </>
  );
}

export default App;
