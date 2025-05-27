import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NavigateToProfile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    if (!userInfo) {
      navigate("/login"); // إذا لم يكن مسجل دخول
      return;
    }

    if (userInfo.user_type === "store") {
      navigate("/profile/store");
    } else {
      navigate("/profile/customer");
    }
  }, [navigate]);

  return null;
};

export default NavigateToProfile;
