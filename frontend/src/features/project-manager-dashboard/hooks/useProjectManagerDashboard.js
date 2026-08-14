import {
    useEffect,
    useState,
} from "react";

import toast from "react-hot-toast";

import projectManagerDashboardService
    from "../services/projectManagerDashboardService";


export default function useProjectManagerDashboard() {

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
                    await projectManagerDashboardService
                        .getDashboardData();

                setDashboard(data);

            } catch (error) {

                console.error(
                    "Project manager dashboard error:",
                    error
                );

                setError(error);

                toast.error(
                    "Failed to load Project Manager Dashboard."
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