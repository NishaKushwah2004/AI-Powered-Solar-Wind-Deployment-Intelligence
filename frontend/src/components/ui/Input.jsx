import { forwardRef } from "react";

const Input = forwardRef(
    (
        {
            label,
            error,
            className = "",
            ...props
        },
        ref
    ) => {
        return (
            <div className="space-y-2">

                {label && (
                    <label className="block text-sm font-medium text-slate-700">
                        {label}
                    </label>
                )}

                <input
                    ref={ref}
                    {...props}
                    className={`w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-teal-600 focus:outline-none ${className}`}
                />

                {error && (
                    <p className="text-sm text-red-600">
                        {error}
                    </p>
                )}

            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;