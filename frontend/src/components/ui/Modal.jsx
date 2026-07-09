export default function Modal({
    title,
    children,
    isOpen,
    onClose,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                        {title}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-slate-500 hover:text-black"
                    >
                        ✕
                    </button>
                </div>

                {children}
            </div>
        </div>
    );
}