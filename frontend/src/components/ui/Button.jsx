import Spinner from "./Spinner";

export default function Button({
    children,
    type = "button",
    variant = "primary",
    disabled = false,
    loading = false,
    onClick,
    className = "",
}) {

    const baseStyle =
        "inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium transition-all duration-200 focus:outline-none disabled:cursor-not-allowed";

    const variants = {
        primary:
            "bg-teal-700 text-white hover:bg-teal-800 disabled:bg-teal-400",

        secondary:
            "bg-slate-200 text-slate-900 hover:bg-slate-300",

        danger:
            "bg-red-600 text-white hover:bg-red-700",

        outline:
            "border border-slate-300 bg-white hover:bg-slate-100",
    };

    return (
        <button
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            className={`${baseStyle} ${variants[variant]} ${className}`}
        >
            {loading ? <Spinner /> : children}
        </button>
    );
}