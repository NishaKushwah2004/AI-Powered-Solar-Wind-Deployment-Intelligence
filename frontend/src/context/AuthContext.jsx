import {
    createContext,
    useState,
    useEffect,
} from "react";

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

    // Indicates whether the initial authentication check has completed
    const [initialized, setInitialized] = useState(false);

    // ---------------- LOGIN ----------------

    const login = async (email, password) => {

        setLoading(true);

        try {

            const token = await loginApi(
                email,
                password,
            );

            saveToken(token.access_token);

            const profile =
                await getCurrentUser();

            setUser(profile);

            return true;

        } catch (error) {

            removeToken();

            setUser(null);

            throw error;

        } finally {

            setLoading(false);

        }

    };

    // ---------------- LOGOUT ----------------

    const logout = () => {

        removeToken();

        setUser(null);

    };

    // ---------------- LOAD USER ----------------

    const loadUser = async () => {

        const token = getToken();

        if (!token) {

            setInitialized(true);

            return;

        }

        try {

            const profile =
                await getCurrentUser();

            setUser(profile);

        } catch {

            logout();

        } finally {

            setInitialized(true);

        }

    };

    // ---------------- ROLES ----------------

    const hasRole = (...roles) => {

        if (!user) return false;

        return roles.includes(
            user.role.name
        );

    };

    // ---------------- INITIALIZE ----------------

    useEffect(() => {

        loadUser();

    }, []);

    return (

        <AuthContext.Provider

            value={{

                user,

                loading,

                initialized,

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