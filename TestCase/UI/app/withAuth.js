import { decrypt } from "@/libs/encryption";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/slices/auth/authSlice";

const withAuth = (WrappedComponent) => {
  const AuthCheck = (props) => {
    const router = useRouter();
    const auth = JSON.parse(decrypt(useSelector((state) => state.auth.user)));
    const authLogin = decrypt(useSelector((state) => state.auth.loggedIn));

    const dispatch = useDispatch();
    useEffect(() => {
      if (
        auth.token == "" ||
        auth.token == undefined ||
        (auth.token == null && !auth.loginStatus) ||
        !authLogin
      ) {
        dispatch(logout());
        router.push("/login");
      }
    }, []);

    const isUserLoggedIn = !!auth;

    return isUserLoggedIn ? <WrappedComponent {...props} /> : null;
  };

  return AuthCheck;
};

export default withAuth;
