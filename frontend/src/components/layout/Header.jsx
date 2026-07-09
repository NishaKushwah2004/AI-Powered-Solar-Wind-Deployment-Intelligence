import useAuth from "../../hooks/useAuth";

export default function Header() {
    const { user } = useAuth();

    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-8 shadow-sm">

            <h2 className="text-xl font-semibold text-slate-800">
                Dashboard
            </h2>

            <div className="text-right">

                <p className="font-medium">
                    {user?.full_name}
                </p>

                <p className="text-sm text-slate-500">
                    {user?.role?.name}
                </p>

            </div>

        </header>
    );
}