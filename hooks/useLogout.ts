import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import { logoutAction } from "@/store/authSlice";

export function useLogout() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logoutAction());
    router.replace("/login");
  };

  return handleLogout;
}
