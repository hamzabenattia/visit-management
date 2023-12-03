

export const requestListReducer = (state = { requests: [] }, action) => {
  switch (action.type) {
    case "REQUEST_LIST_REQUEST":
      return { loading: true };
    case "REQUEST_LIST_SUCCESS":
      return { loading: false, requests: action.payload };
    case "REQUEST_LIST_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ORDER DETAILS
export const requestDetailsReducer = (
  state = { loading: true, },
  action
) => {
  switch (action.type) {
    case "REQUEST_DETAILS_REQUEST":
      return { ...state, loading: true };
    case "REQUEST_DETAILS_SUCCESS":
      return { loading: false, request: action.payload };
    case "REQUEST_DETAILS_FAIL":
      return { loading: false, request: action.payload };
    default:
      return state;
  }
};

// Request  Accepted
export const requestDeliveredReducer = (state = {}, action) => {
  switch (action.type) {
    case "REQUEST_DELIVERED_REQUEST":
      return { loading: true };
    case "REQUEST_DELIVERED_SUCCESS":
      return { loading: false, success: true };
    case "REQUEST_DELIVERED_FAIL":
      return { loading: false, error: action.payload };
    case "REQUEST_DELIVERED_RESET":
      return {};
    default:
      return state;
  }
};

////////////

export const requestRefusedReducer = (state = {}, action) => {
  switch (action.type) {
    case "REQUEST_REFUSED_REQUEST":
      return { loading: true };
    case "REQUEST_REFUSED_SUCCESS":
      return { loading: false, success: true };
    case "REQUEST_DELIVERED_FAIL":
      return { loading: false, error: action.payload };
    case "REQUEST_REFUSED_FAIL":
      return {};
    default:
      return state;
  }
};

export const requestCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case "REQUEST_CREATE_REQUEST":
      return { loading: true };
    case "REQUEST_CREATE_SUCCESS":
      return { loading: false, success: true, request: action.payload };
    case "REQUEST_CREATE_FAIL":
      return { loading: false, error: action.payload };
    case "REQUEST_CREATE_RESET":
      return {};
    default:
      return state;
  }
};



export const RequestDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case "REQUEST_DELETE_REQUEST":
      return { loading: true };
    case "REQUEST_DELETE_SUCCESS":
      return { loading: false, success: true };
    case "REQUEST_DELETE_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

