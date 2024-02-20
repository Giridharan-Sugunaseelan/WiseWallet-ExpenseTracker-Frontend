import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/features/user/userSlice";
import { logout } from "../../service/authservice";

function DropDownComponent() {
  const user = useSelector((state) => state.user.user);
  const dispatcher = useDispatch();
  useEffect(() => {
    dispatcher(fetchUser());
  }, [dispatcher]);
  return (
    <div className="flex flex-col dropDownProfile">
      <div className="userDetails">
        <ul className="flex flex-col gap-4 list">
          <div className="user">
            <div className="profilepic">
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/ios/50/user-male-circle--v1.png"
                alt="user-male-circle--v1"
              />
            </div>
            <div>
              <div className="menu">
                <li>Hi, {user?.firstName}!</li>
              </div>
              <div className="email">
                <li>{user?.email}</li>
              </div>
            </div>
          </div>
        </ul>
      </div>
      <div className="dropdownButtons">
        <button>
          <a href="/wisewallet/profile" className="profile">
            Profile
          </a>
        </button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default DropDownComponent;
