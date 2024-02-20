import { useState } from "react";
import styles from "./LoginComponent.module.css";
import {
  login as loginCall,
  saveLoggedInUser,
  setToken,
} from "../../service/authservice";
import { useNavigate } from "react-router-dom";
// import TableComponent from '../TableComponent/TableComponent';
function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const navigator = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const invalid = false;

  function validateError() {
    let isValid = true;
    if (email.trim() === "") {
      setError((e) => ({ ...e, email: "Enter E-mail" }));
      isValid = false;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setError((e) => ({ ...e, email: "Invalid Email" }));
      isValid = false;
    }
    if (password.trim() === "") {
      setError((e) => ({ ...e, password: "Enter Password" }));
      isValid = false;
    }
    return isValid;
  }

  async function login(e) {
    e.preventDefault();
    if (validateError()) {
      const logInUser = { email, password };
      setEmail("");
      setPassword("");
      await loginCall(logInUser)
        .then((response) => {
          // console.log(response.data);
          const token = "Bearer " + response.data.accessToken;
          saveLoggedInUser(email);
          setToken(token);
          navigator("/wisewallet/dashboard");
        })
        .catch((error) => {
          setErrorMessage(error.response?.data?.message);
          // console.log(error.response?.data?.message);
        });
    }
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3" id={styles.formContainer}>
            <h2 className="text-center" id={styles.header}>
              WiseWallet <i className="fa-solid fa-wallet"></i>
            </h2>
            <form>
              <input
                type="text"
                className={`form-control ${
                  error.email ? "is-invalid" : ""
                }  mt-4 mb-2`}
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className={`invalid-feedback`}>{error.email}</div>
              <input
                type="password"
                className={`form-control ${
                  error.password ? "is-invalid" : ""
                } mt-4 mb-4 ${styles.password}`}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="invalid-feedback">{error.password}</div>
              {errorMessage}
              <div className={styles.forgotPassword}>
                <a href="/wisewallet/forgot-password">Forgot password</a>
              </div>
              <div className={styles.login}>
                <div className={styles.buttonContainer}>
                  <button className={styles.button} onClick={login}>
                    Login
                  </button>
                </div>
                <div className={styles.signin}>
                  <p>
                    Don't have an account?{" "}
                    <a href="/wisewallet/register">Sign Up</a>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginComponent;
