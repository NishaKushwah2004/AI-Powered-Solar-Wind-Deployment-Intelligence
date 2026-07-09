import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import dashboardService from "../services/dashboardService";

export default function useDashboard() {

    const [summary, setSummary] = useState({
        totalProjects: 0,
        totalSites: 0,
        systemStatus: "Online",
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadDashboard() {

            try {

                setLoading(true);

                const data =
                    await dashboardService.getDashboardData();

                setSummary(data);

            } catch (error) {

                toast.error(
                    "Failed to load dashboard."
                );

            } finally {

                setLoading(false);

            }

        }

        loadDashboard();

    }, []);

    return {
        summary,
        loading,
    };

}