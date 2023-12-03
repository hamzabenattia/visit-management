export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
      case "USER_LIST_REQUEST":
        return { loading: true };
      case "USER_LIST_SUCCESS":
        return { loading: false, users: action.payload };
      case "USER_LIST_FAIL":
        return { loading: false, error: action.payload };
      case "USER_LIST_RESET":
        return { users: [] };
      default:
        return state;
    }
  };
  
  export const UserDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case "USER_DELETE_REQUEST":
        return { loading: true };
      case "USER_DELETE_SUCCESS":
        return { loading: false, success: true };
      case "USER_DELETE_FAIL":
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  

  
  export const userUpdateReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case "USER_UPDATE_REQUEST":
        return { loading: true };
      case "USER_UPDATE_SUCCESS":
        return { loading: false, success: true, user: action.payload };
      case "USER_UPDATE_FAIL":
        return { loading: false, error: action.payload };
      case "USER_UPDATE_RESET":
        return { user: {} };
      default:
        return state;
    }
  };


  export const USERCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case "USER_CREATE_REQUEST":
        return { loading: true };
      case "USER_CREATE_SUCCESS":
        return { loading: false, success: true, user: action.payload };
      case "USER_CREATE_FAIL":
        return { loading: false, error: action.payload };
      case "USER_CREATE_RESET":
        return {};
      default:
        return state;
    }
  };
  
  