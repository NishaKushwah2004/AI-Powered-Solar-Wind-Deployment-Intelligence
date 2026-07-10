export default function FeatureCard({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg">

      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-teal-100">

        <Icon
          size={28}
          className="text-teal-600"
        />

      </div>

      <h3 className="text-xl font-semibold">

        {title}

      </h3>

      <p className="mt-3 text-slate-600">

        {description}

      </p>

    </div>
  );
}