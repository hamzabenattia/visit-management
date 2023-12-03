import axios from "axios";
import { toast } from "react-toastify";

// LOGIN
export const login = (email, password) => async (dispatch) => {
  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };
  try {
    dispatch({ type: "USER_LOGIN_REQUEST" });

    const { data } = await axios.post(
      `/api/auth/login`,
      { email, password }
    );
    if (!data.user.isActive) {
      toast.error("You don't have an active account", ToastObjects);
      dispatch({
        type: "USER_LOGIN_FAIL",
      });
    } else {
      dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });
    }
    localStorage.setItem("userInfo", JSON.stringify(data.user));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Unauthorized no Token") {
      dispatch(logout());
    }
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload: message,
    });
  }
};

// LOGOUT
export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  const { data } = await axios.get(`/api/auth/logout`);
  dispatch({ type: "USER_LOGOUT" });
  dispatch({ type: "USER_LIST_RESET" });
};



export const forgotPassword = (email) => async (dispatch) => {

  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };
  try {

      dispatch({ type: "FORGOT_PASSWORD_REQUEST" });

      const { data } = await axios.post(
          '/api/auth/password/forgot',
          {email}
      );

      dispatch({
          type: "FORGOT_PASSWORD_SUCCESS",
          payload: data.message,
      });

    toast.success(data.message, ToastObjects);

  } catch (error) {
      dispatch({
          type: "FORGOT_PASSWORD_FAIL",
          payload: error.response.data.message,
      });
  }
};


export const resetPassword = (token, password) => async (dispatch) => {

  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };

  try {

      dispatch({ type: "RESET_PASSWORD_REQUEST" });


      const { data } = await axios.put(
          `/api/auth/password/reset/${token}`,
          {password},
      );

      dispatch({
          type: "RESET_PASSWORD_SUCCESS",
          payload: data.success,
      });
      toast.success(data.message, ToastObjects);
      dispatch(logout());

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
      dispatch({
          type: "RESET_PASSWORD_FAIL",
          payload: error.response.data.message,
      });
      toast.error(message, ToastObjects);

  }
};

