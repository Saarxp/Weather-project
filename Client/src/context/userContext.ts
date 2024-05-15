import { createContext } from "react";
import { UserType } from "../types/user/UserType";

export const UserContext = createContext<UserType | undefined>(undefined)