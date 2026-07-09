export default function DashboardGrid({
    children,
}) {
    return (

        <div
            className="
            grid
            gap-6
            md:grid-cols-2
            xl:grid-cols-4
            "
        >
            {children}
        </div>

    );
}