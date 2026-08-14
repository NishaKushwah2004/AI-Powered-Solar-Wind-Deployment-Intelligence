import {
    useEffect,
    useState,
} from "react";

import toast from "react-hot-toast";

import plannerDashboardService
    from "../services/plannerDashboardService";


export default function usePlannerDashboard() {

    const [
        dashboard,
        setDashboard,
    ] = useState(null);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        error,
        setError,
    ] = useState(null);


    useEffect(() => {

        async function loadDashboard() {

            try {

                setLoading(true);
                setError(null);

                const data =
                    await plannerDashboardService
                        .getDashboardData();

                setDashboard(data);

            } catch (error) {

                console.error(
                    "Planner dashboard error:",
                    error
                );

                setError(error);

                toast.error(
                    "Failed to load planner dashboard."
                );

            } finally {

                setLoading(false);

            }

        }


        loadDashboard();

    }, []);


    return {

        dashboard,

        loading,

        error,

    };

}