import { logout } from "./userActions";
import axios from "axios";

export const listRequests = () => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: "REQUEST_LIST_REQUEST" });

    const { data } = userInfo.isAdmin || userInfo.user?.isAdmin ?  await axios.get(`/api/admin/request/`): await axios.get(`/api/request/`)

    dispatch({ type: "REQUEST_LIST_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Unauthorized no Token") {
      dispatch(logout());
    }
    dispatch({
      type: "REQUEST_LIST_FAIL",
      payload: message,
    });
  }
};

// ORDER DETAILS
export const getRequestDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "REQUEST_DETAILS_REQUEST" });

    const { data } = await axios.get(`/api/request/${id}`);
    dispatch({ type: "REQUEST_DETAILS_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Unauthorized no Token") {
      dispatch(logout());
    }
    dispatch({
      type: "REQUEST_DETAILS_FAIL",
      payload: message,
    });
  }
};


export const createRequest =
  (object, visitdate, visithour, personnes) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: "REQUEST_CREATE_REQUEST" });

    

      const {data } = await axios.post(
        `/api/request/`,
        object, visitdate, visithour, personnes ,
      );

      dispatch({ type: "REQUEST_CREATE_SUCCESS", payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Unauthorized no Token") {
        dispatch(logout());
      }
      dispatch({
        type: "REQUEST_CREATE_FAIL",
        payload: message,
      });
    }
  };


// ORDER Accepted
export const AcceptRequest = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "REQUEST_DELIVERED_REQUEST" });

    

    const { data } = await axios.put(
      `/api/admin/request/${id}/accept`,
      {},
    );
    dispatch({ type: "REQUEST_DELIVERED_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Unauthorized no Token") {
      dispatch(logout());
    }
    dispatch({
      type: "REQUEST_DELIVERED_FAIL",
      payload: message,
    });
  }
};

export const RefuseRequest = (id,RefuseReason) => async (dispatch, getState) => {
  try {
    dispatch({ type: "REQUEST_REFUSED_REQUEST" });

    

    const { data } = await axios.put(
      `/api/admin/request/${id}/refuse`,
      {RefuseReason},
    );
    console.log(id,RefuseReason)
    dispatch({ type: "REQUEST_REFUSED_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Unauthorized no Token") {
      dispatch(logout());
    }
    dispatch({
      type: "REQUEST_REFUSED_FAIL",
      payload: message,
    });
  }
};

export const deleteRequest = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "REQUEST_DELETE_REQUEST" });

    await axios.delete(`/api/request/${id}`);

    dispatch({ type: "REQUEST_DELETE_SUCCESS" });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Unauthorized no Token") {
      dispatch(logout());
    }
    dispatch({
      type: "REQUEST_DELETE_FAIL",
      payload: message,
    });
  }
};


