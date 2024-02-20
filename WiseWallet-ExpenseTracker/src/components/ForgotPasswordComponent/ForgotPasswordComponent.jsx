import { useState } from "react";
import { forgotPassword } from "../../service/authservice";
import styles from "./ForgotPassword.module.css";
import { useNavigate } from "react-router-dom";

function ForgotPasswordComponent() {
  const [email, setEmail] = useState("");

  const [error, setError] = useState({ email: "" });

  const navigator = useNavigate();

  function validateError() {
    let isValid = true;
    if (email.trim() === "") {
      setError((e) => ({ ...e, email: "Enter Email" }));
      isValid = false;
    }
    if (!email.includes("@")) {
      setError((e) => ({ ...e, email: "Invalid Email" }));
      isValid = false;
    }
    return isValid;
  }
  function forgetPassword(e) {
    e.preventDefault();
    if (validateError()) {
      forgotPassword(email)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3" id={styles.formContainer}>
          <h2 className="text-center" id={styles.header}>
            WiseWallet <i className="fa-solid fa-wallet"></i>
          </h2>
          <h3>Forgot Password</h3>
          <p>Password reset link will be sent to your email.</p>
          <form>
            <div className={styles.emailInputContainer}>
              <input
                type="text"
                className={`form-control ${error.email ? "is-invalid" : ""}`}
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="invalid-feedback"> {error?.email}</div>
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.button} onClick={forgetPassword}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordComponent;
