import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/LoadingError/Loading";
import Toast from "../components/LoadingError/Toast";
import { forgotPassword } from "../Redux/Actions/userActions";
import Message from "../components/LoadingError/Error";

const ForgotPassword = ({ history }) => {
  window.scrollTo(0, 0);
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo } = userLogin;

  const { error, loading } = useSelector((state) => state.forgotPassword);


  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
    setEmail("");
  };

  return (
    <>
      <Toast />
      <div className="login">
      <div
        className="card shadow mx-auto"
        style={{ maxWidth: "380px", marginTop: "100px" }}
      >
        <div className="card-body">
          {error && <Message variant="alert-danger">{error}</Message>}
          {loading && <Loading />}

          <h4 className="card-title mb-4 text-center" style={{"color":"#237C8D" , "font-family": "'Roboto', sans-serif"}}>Réinitialiser le mot de passe</h4>

          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
           

            <div className="mb-4">
              <button type="submit" className="btn btn-login  w-100">
                Continue
              </button>
            </div>
          </form>
        </div>
      </div></div>

    </>
  );
};

export default ForgotPassword;
