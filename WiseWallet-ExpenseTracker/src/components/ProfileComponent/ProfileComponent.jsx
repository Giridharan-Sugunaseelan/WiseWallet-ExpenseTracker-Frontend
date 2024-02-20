import { useState } from "react";
import Footer from "../Home/Footer";
import Header from "../Home/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../../redux/features/user/userSlice";
import { logout, resetPassword } from "../../service/authservice";
import styles from "./ProfileComponent.module.css";

function ProfileComponent() {
  const [newPassword, setNewPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const user = useSelector((state) => state.user.user);
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(fetchUser());
  }, []);

  function updatePassword(e) {
    e.preventDefault();
    console.log("Update password function called"); // Add this line
    if (newPassword === reEnterPassword) {
      resetPassword(newPassword)
        .then((response) => console.log(response.data))
        .then(() => {
          logout();
        })
        .catch((error) => console.error(error));
    } else {
      console.log("Passwords are not matching");
    }
  }

  return (
    <>
      <Header />
      <div className="container profileContainer">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className={styles.box}>
              <div className={styles.details}>
                <h2>Account details</h2>
                <div className={styles.fields}>
                  <li>FirstName: {user?.firstName}</li>
                  <li>LastName: {user?.lastName}</li>
                  <li>E-mail: {user?.email}</li>
                </div>
              </div>
              <hr />
              <div className={styles.resetPasswordContainer}>
                <h2>Reset Password</h2>
                <form>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm password"
                    value={reEnterPassword}
                    onChange={(e) => setReEnterPassword(e.target.value)}
                  />
                  <button onClick={updatePassword} className={styles.reset}>
                    Reset Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProfileComponent;
