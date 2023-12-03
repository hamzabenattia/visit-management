import React, {useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/LoadingError/Loading";
import Toast from "../components/LoadingError/Toast";
import {resetPassword } from "../Redux/Actions/userActions";
import Message from "../components/LoadingError/Error";
import { useParams } from "react-router-dom";

const ResetPassword = ({ history }) => {
  window.scrollTo(0, 0);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");



  const dispatch = useDispatch();
  const params = useParams();
  const { error, success, loading } = useSelector((state) => state.forgotPassword);

    const submitHandler = (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setErr("La longueur du mot de passe doit être d'au moins 8 caractères");
      return;
    }
    if (password !== confirmPassword) {
      setErr("Le mot de passe ne correspond pas");
      return;
    }
    dispatch(resetPassword(params.id, password));
    if (error) {
      history.push("/login")
    }
    else{
      history.push("/login")
    }
  }
  return (
    <div className="login">
      <Toast />
      <div
        className="card shadow mx-auto"
        style={{ maxWidth: "380px", marginTop: "100px" }}
      >
        <div className="card-body">
          {err && <Message variant="alert-danger">{err}</Message>}
          {loading && <Loading />}

          <h4 className="card-title mb-4 text-center" style={{"color":"#237C8D" , "font-family": "'Roboto', sans-serif"}} >Reset Password</h4>

          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Confirme Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <button type="submit" className="btn btn-login w-100">
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
