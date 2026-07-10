export default function MapLegend() {
  return (
    <div className="absolute bottom-5 right-5 z-[1000] rounded-xl bg-white p-4 shadow-lg">

      <h3 className="mb-3 font-semibold">

        Legend

      </h3>

      <div className="flex items-center gap-2">

        <div className="h-3 w-3 rounded-full bg-red-500" />

        <span>Site Location</span>

      </div>

    </div>
  );
}