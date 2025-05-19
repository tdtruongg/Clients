import { useQuery } from "@tanstack/react-query";
import request from "../api/request";
import useAuth from "./useAuth";

const useProfile = () => {
  const { isAuthenticated } = useAuth();

  const { data, isPending } = useQuery({
    queryKey: ["PROFILE"],
    queryFn: () => request.get("/user/profile"),
    enabled: isAuthenticated,
  });

  return {
    profile: data,
    isLoading: isPending,
  };
};

export default useProfile;
