export default function Checkbox({
  label,
  ...props
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        className="h-4 w-4 accent-teal-500"
        {...props}
      />
      <span className="text-sm">{label}</span>
    </label>
  );
}