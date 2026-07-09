import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

import LoadingState from "../components/common/LoadingState";

export default function ProtectedRoute({
    children,
}) {

    const {
        initialized,
        user,
    } = useAuth();

    if (!initialized) {
        return <LoadingState />;
    }

    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return children;
}