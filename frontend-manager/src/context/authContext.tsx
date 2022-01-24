import React, {
    useState,
    createContext,
    useMemo,
    Dispatch,
    SetStateAction,
    useContext,
} from "react";
import { AuthUserObject } from "../types";

type authUserContextType = {
    authUser: AuthUserObject | undefined;
    setAuthUser: Dispatch<SetStateAction<AuthUserObject | undefined>>;
};

const authContext = createContext<authUserContextType>({
    authUser: undefined,
    setAuthUser: () => {},
});

export function useAuthContext() {
    return useContext(authContext);
}

export const AuthUserProvider: React.FC<any> = ({ children }) => {
    const [authUser, setAuthUser] = useState<AuthUserObject | undefined>(
        undefined
    );

    const value = useMemo(() => ({ authUser, setAuthUser }), [authUser]);

    return (
        <authContext.Provider value={value}>{children}</authContext.Provider>
    );
};
