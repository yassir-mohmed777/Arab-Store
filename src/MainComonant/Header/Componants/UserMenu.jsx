import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../zustand-store/auth/authStore";

export default function UserMenu() {
  const navigate = useNavigate();
  const { user, logout ,isLoading} = useAuth();
                        
  const handleProfileClick = () => {
   

    if (!user) {
      navigate("/login");
      return;
    }

    if (user.user_type === "customer") {
      navigate("/profile/customer");
    } else if (user.user_type === "store") {
      navigate("/profile/store");
    }
  };

  return (
    <div className="dropdown dropdown-hover dropdown-end">
      <div tabIndex={0} role="button" className="m-1">
        <AiOutlineUser className="text-2xl text-black cursor-pointer" />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box shadow-md w-52 p-2 z-[1]"
      >
        <li>
          <button disabled={isLoading} onClick={handleProfileClick}>الملف الشخصي</button>
        </li>
        <li>
          <button onClick={() => logout()}>تسجيل الخروج</button>
        </li>
      </ul>
    </div>
  );
}
