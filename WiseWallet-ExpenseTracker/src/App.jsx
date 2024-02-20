import "./App.css";
import About from "./components/About/About";
import Dashboard from "./components/Dashboard/Dashboard";
import { Home } from "./components/Home/Home";
import { Route, Routes, Navigate } from "react-router-dom";
import RegisterComponent from "./components/RegisterComponent/RegisterComponent";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import TransactionComponent from "./components/TransactionComponent/TransactionComponent";
import { isUserLoggedIn } from "./service/authservice";
import ProfileComponent from "./components/ProfileComponent/ProfileComponent";
import ResetPasswordComponent from "./components/ResetPasswordComponent/ResetPasswordComponent";
import ForgotPasswordComponent from "./components/ForgotPasswordComponent/ForgotPasswordComponent";
function App() {
  function AuthenticatedRoutes({ children }) {
    const isAuth = isUserLoggedIn();
    if (isAuth) {
      return children;
    }
    return <Navigate to="/wisewallet/login" />;
  }
  return (
    <>
      <Routes>
        <Route path="wisewallet" Component={Home} />
        <Route path="wisewallet/about" Component={About} />
        <Route path="wisewallet/register" Component={RegisterComponent} />
        <Route path="wisewallet/login" Component={LoginComponent} />
        <Route
          path="wisewallet/resetPassword"
          Component={ResetPasswordComponent}
        />
        <Route
          path="wisewallet/forgot-password"
          Component={ForgotPasswordComponent}
        />
        <Route
          path="wisewallet/dashboard"
          element={
            <AuthenticatedRoutes>
              <Dashboard />
            </AuthenticatedRoutes>
          }
        />
        <Route
          path="wisewallet/transactions"
          element={
            <AuthenticatedRoutes>
              <TransactionComponent />
            </AuthenticatedRoutes>
          }
        />
        <Route
          path="wisewallet/profile"
          element={
            <AuthenticatedRoutes>
              <ProfileComponent />
            </AuthenticatedRoutes>
          }
        />
      </Routes>
    </>
  );
}

export default App;
