export default function HeroBadge({
  children,
}) {
  return (
    <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
      {children}
    </span>
  );
}