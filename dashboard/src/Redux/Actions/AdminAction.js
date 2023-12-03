import axios from "axios";
import { toast } from "react-toastify";
import { logout } from "./userActions";



export const listUser = () => async (dispatch, getState) => {
    try {
      dispatch({ type: "USER_LIST_REQUEST" });
  
  
      const { data } = await axios.get(`/api/admin/users/`);
  
      dispatch({ type: "USER_LIST_SUCCESS", payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Unauthorized no Token") {
        dispatch(logout());
      }
      dispatch({
        type: "USER_LIST_FAIL",
        payload: message,
      });
    }
  };
  
  
  export const deleteUser = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: "USER_DELETE_REQUEST" });
  
      await axios.delete(`/api/admin/users/${id}`);
  
      dispatch({ type: "USER_DELETE_SUCCESS" });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Unauthorized no Token") {
        dispatch(logout());
      }
      dispatch({
        type: "USER_DELETE_FAIL",
        payload: message,
      });
    }
  };
  
  
  
  // UPDATE user
  export const updateUser = (user) => async (dispatch, getState) => {
    try {
      dispatch({ type: "USER_UPDATE_REQUEST" });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      
  
      const { data } = await axios.put(
        `/api/admin/users/${user.id}`,
        user,
      );

  
      dispatch({ type: "USER_UPDATE_SUCCESS", payload: data });
      dispatch({ type: "USER_EDIT_SUCCESS", payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Unauthorized no Token") {
        dispatch(logout());
      }
      dispatch({
        type: "USER_UPDATE_FAIL",
        payload: message,
      });
    }
  };
  


  export const createUser =
  (firstname,lastname,cin, email,phonenum,socite,sociteAdress,isAdmin) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: "USER_CREATE_REQUEST" });
      const {data } = await axios.post(
        `/api/admin/users/add`,
        firstname,lastname,cin, email,phonenum,socite,sociteAdress ,isAdmin
      );

      dispatch({ type: "USER_CREATE_SUCCESS", payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
          console.log(error.message)
      if (message === "Unauthorized no Token") {
        dispatch(logout());
      }
      dispatch({
        type: "USER_CREATE_FAIL",
        payload: message,
      });
    }
  };
