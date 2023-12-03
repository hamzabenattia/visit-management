
// LOGIN
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { loading: true };
    case "USER_LOGIN_SUCCESS":
      return { loading: false, userInfo: action.payload };
    case "USER_LOGIN_FAIL":
      return { loading: false, error: action.payload };
    case "USER_LOGOUT":
      return {};
    default:
      return state;
  }
};

export const forgotPasswordReducer = (state = {}, { type, payload }) => {
  switch (type) {
      case "FORGOT_PASSWORD_REQUEST":
      case "RESET_PASSWORD_REQUEST":
          return {
              ...state,
              loading: true,
          };
      case "FORGOT_PASSWORD_SUCCESS":
          return {
              ...state,
              loading: false,
              message: payload,
          };
      case "RESET_PASSWORD_SUCCESS":

          return {
              ...state,
              loading: false,
              success: payload,
          };
      case "FORGOT_PASSWORD_FAIL":
      case "RESET_PASSWORD_FAIL":
          return {
              ...state,
              loading: false,
              error: payload,
          };
      default:
          return state;
  }
};


