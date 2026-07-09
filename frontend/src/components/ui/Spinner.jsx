export default function Spinner({ size = 6 }) {
    return (
        <div className="flex items-center justify-center">
            <div
                className={`animate-spin rounded-full border-2 border-white border-t-transparent h-${size} w-${size}`}
            />
        </div>
    );
}