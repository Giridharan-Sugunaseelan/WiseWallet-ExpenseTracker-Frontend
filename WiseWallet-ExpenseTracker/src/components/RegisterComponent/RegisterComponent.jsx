import React, { useState } from "react";
import styles from "./RegisterComponent.module.css";
import { register as registerCall } from "../../service/authservice";
import { useNavigate } from "react-router-dom";
function RegisterComponent() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [exceptionMessage, setExceptionMessage] = useState(null);
  let invalid = false;
  function validateError() {
    let isValid = true;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
    if (firstName.trim() === "") {
      setError((e) => ({ ...e, firstName: "Enter First Name" }));
      isValid = false;
    }
    if (firstName.includes(" ")) {
      setError((e) => ({ ...e, firstName: "First Name cannot have spaces" }));
      isValid = false;
    }
    if (lastName.trim() === "") {
      setError((e) => ({ ...e, lastName: "Enter Last Name" }));
      isValid = false;
    }
    if (lastName.includes(" ")) {
      setError((e) => ({ ...e, lastName: "Last Name cannot have spaces" }));
      isValid = false;
    }
    if (email.trim() === "" || !email.includes("@") || !email.includes(".")) {
      setError((e) => ({ ...e, email: "Enter valid Email" }));
      isValid = false;
    }
    if (password.trim() === "") {
      setError((e) => ({ ...e, password: "Enter Password" }));
      isValid = false;
    }
    if (password.length < 8) {
      setError((e) => ({
        ...e,
        password: "Password should have atleast 8 characters",
      }));
      isValid = false;
    }
    return isValid;
  }

  const navigator = useNavigate();

  const register = (e) => {
    e.preventDefault();
    if (validateError()) {
      const newUser = { firstName, lastName, email, password };
      registerCall(newUser)
        .then((response) => {
          console.log(response.data);
          navigator("/wisewallet/login");
        })
        .catch((error) => {
          // console.log(error.response.data);
          setExceptionMessage(error.response?.data?.message);
          console.log(error.response?.data?.message);
          invalid = true;
        });
    }
  };

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
                  error.firstName ? "is-invalid" : ""
                } mt-4 mb-2`}
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <div className="invalid-feedback">{error.firstName}</div>
              <input
                type="text"
                className={`form-control ${
                  error.lastName ? "is-invalid" : ""
                } mt-4 mb-2`}
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <div className="invalid-feedback">{error.lastName}</div>
              <input
                type="text"
                className={`form-control ${
                  error.email ? "is-invalid" : ""
                } mt-4 mb-2`}
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="invalid-feedback">{error.email}</div>
              <input
                type="password"
                className={`form-control ${
                  error.password ? "is-invalid" : ""
                } mt-4 mb-2`}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="invalid-feedback">{error.password}</div>
              {invalid && (
                <div className="invalid-feedback">
                  {exceptionMessage}
                  {console.log(exceptionMessage)}
                </div>
              )}
              <div className={styles.some}>
                <div className={styles.buttonContainer}>
                  <button className={styles.button} onClick={register}>
                    Register
                  </button>
                </div>
                <div className={styles.signin}>
                  <p>
                    Already have account?{" "}
                    <a href="/wisewallet/login">Sign in</a>
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

export default RegisterComponent;
