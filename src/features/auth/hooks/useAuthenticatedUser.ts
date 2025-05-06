import { useAuthContext } from "src/core/context/AuthContext";

export const useAuthenticatedUser = () => {
    const { user, isLoading } = useAuthContext();
    const isReady = !isLoading && !!user?._id;
    return { user, isReady };
  };
  