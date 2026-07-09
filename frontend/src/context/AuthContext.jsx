import { createContext, useState } from "react";

import {
    login as loginApi,
    getCurrentUser,
} from "../api/auth/authApi";

import {
    saveToken,
    removeToken,
    getToken,
} from "../utils/storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {

        setLoading(true);

        try {

            console.log("Sending Login Request...");

            const token = await loginApi(email, password);

            console.log("Login Response:", token);

            saveToken(token.access_token);

            const profile =
                await getCurrentUser();

            setUser(profile);

            return true;

        } catch (error) {

            removeToken();

            throw error;

        } finally {

            setLoading(false);

        }

    };

    const logout = () => {

        removeToken();

        setUser(null);

    };

    const loadUser = async () => {

        if (!getToken()) {

            return;

        }

        try {

            const profile =
                await getCurrentUser();

            setUser(profile);

        }

        catch {

            logout();

        }

    };

    const hasRole = (...roles) => {

        if (!user) return false;

        return roles.includes(
            user.role.name
        );

    };

    return (

        <AuthContext.Provider

            value={{

                user,

                loading,

                login,

                logout,

                loadUser,

                hasRole,

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}

export default AuthContext;