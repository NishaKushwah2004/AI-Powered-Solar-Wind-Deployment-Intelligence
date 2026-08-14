import {
    useEffect,
    useState,
} from "react";

import toast from "react-hot-toast";

import gisAnalystDashboardService
    from "../services/gisAnalystDashboardService";


export default function useGISAnalystDashboard() {

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
                    await gisAnalystDashboardService
                        .getDashboardData();

                setDashboard(data);

            } catch (error) {

                console.error(
                    "GIS dashboard error:",
                    error
                );

                setError(error);

                toast.error(
                    "Failed to load GIS Analyst Dashboard."
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