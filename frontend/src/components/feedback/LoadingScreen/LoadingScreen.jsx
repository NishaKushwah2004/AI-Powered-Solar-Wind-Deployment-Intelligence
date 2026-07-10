import Spinner from "@/components/ui/Spinner";

export default function LoadingScreen() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spinner size="xl" />
    </div>
  );
}