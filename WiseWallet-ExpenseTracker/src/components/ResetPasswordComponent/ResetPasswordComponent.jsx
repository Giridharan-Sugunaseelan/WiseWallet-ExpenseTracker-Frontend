import { useState } from "react";
import { forgotResetPassword, logout } from "../../service/authservice";
import styles from "./ResetPassword.module.css";
import { useSearchParams } from "react-router-dom";

function ResetPasswordComponent() {
  const [newPassword, setNewPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [error, setError] = useState({
    newPassword: "",
    reEnterPassword: "",
    status: "",
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showReEnterPassword, setShowReEnterPassword] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  console.log("Token Recieved -> " + token);

  function validateError() {
    let isValid = true;
    if (newPassword.trim() === "") {
      setError((e) => ({ ...e, newPassword: "Enter New password" }));
      isValid = false;
    }
    if (reEnterPassword.trim() === "") {
      setError((e) => ({ ...e, reEnterPassword: "Confirm Password" }));
      isValid = false;
    }
    if (newPassword !== reEnterPassword) {
      setError((e) => ({ ...e, status: "Both passwords should match" }));
      isValid = false;
    }
    return isValid;
  }
  function updatePassword(e) {
    e.preventDefault();
    if (validateError()) {
      const password = { newPassword };
      forgotResetPassword(token, password).then((response) =>
        console.log(response.data)
      );
      logout();
      console.log(newPassword);
    }
  }

  const togglePasswordVisibility = (field) => {
    if (field === "newPassword") {
      setShowNewPassword(!showNewPassword);
    } else if (field === "reEnterPassword") {
      setShowReEnterPassword(!showReEnterPassword);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3" id={styles.formContainer}>
          <h2 className="text-center" id={styles.header}>
            WiseWallet <i className="fa-solid fa-wallet"></i>
          </h2>
          <h3>Reset Password</h3>
          <form>
            <div className={styles.passwordInputContainer}>
              <input
                type={showNewPassword ? "text" : "password"}
                className={`form-control ${
                  error.newPassword ? "is-invalid" : ""
                } ${styles.inputWithIcon}`}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <div className="invalid-feedback">{error?.newPassword}</div>
              <i
                className={`fa-regular ${
                  showNewPassword ? "fa-eye" : "fa-eye-slash"
                } ${styles.eyeIcon}`}
                onClick={() => togglePasswordVisibility("newPassword")}
              ></i>
            </div>

            <div className={styles.passwordInputContainer}>
              <input
                type={showReEnterPassword ? "text" : "password"}
                className={`form-control ${
                  error.reEnterPassword ? "is-invalid" : ""
                } ${styles.inputWithIcon}`}
                placeholder="Confirm password"
                value={reEnterPassword}
                onChange={(e) => setReEnterPassword(e.target.value)}
              />
              <div className="invalid-feedback">{error?.reEnterPassword}</div>
              <div className="invalid-feedback">{error?.status}</div>
              <div className={styles.match}>{error.status}</div>
              <i
                className={`fa-regular ${
                  showReEnterPassword ? "fa-eye" : "fa-eye-slash"
                } ${styles.eyeIcon}`}
                onClick={() => togglePasswordVisibility("reEnterPassword")}
              ></i>
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.button} onClick={updatePassword}>
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordComponent;
