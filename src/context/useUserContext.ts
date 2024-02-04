import { useContext } from "react";
import { UserActions, UserState } from "../types/userform";
import { UserContext } from "./UserContext";

type UserContextType = {
    state: UserState;
    dispatch: React.Dispatch<UserActions>;
  };
export const useUserContext = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
  };