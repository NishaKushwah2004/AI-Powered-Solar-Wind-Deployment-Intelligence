import Spinner from "../ui/Spinner";

export default function LoadingState() {
    return (
        <div className="flex h-56 items-center justify-center">
            <Spinner />
        </div>
    );
}