export default function ProfileInfo({
  profile,
}) {
  return (
    <div className="space-y-6">

      <div>

        <label className="text-sm font-medium text-slate-500">

          Email

        </label>

        <p className="mt-1">

          {profile.email}

        </p>

      </div>

      <div>

        <label className="text-sm font-medium text-slate-500">

          Role

        </label>

        <p className="mt-1">

          {profile.role?.name}

        </p>

      </div>

      <div>

        <label className="text-sm font-medium text-slate-500">

          Status

        </label>

        <p className="mt-1">

          {profile.is_active
            ? "Active"
            : "Inactive"}

        </p>

      </div>

    </div>
  );
}