import DataState from "@/components/feedback/DataState";

import {
  ProfileHeader,
  ProfileCard,
  ProfileForm,
  ProfileInfo,
} from "../components";

import { useProfile } from "../hooks/useProfile";
import { useUpdateProfile } from "../hooks/useUpdateProfile";

export default function ProfilePage() {
  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useProfile();

  const updateProfile =
    useUpdateProfile();

  function handleSubmit(data) {
    updateProfile.mutate(data);
  }

  return (
    <>
      <ProfileHeader />

      <DataState
        isLoading={isLoading}
        isError={isError}
        error={error}
      >
        {profile && (
          <div className="grid gap-6 lg:grid-cols-3">

            <div className="lg:col-span-2">

              <ProfileCard>

                <ProfileForm
                  defaultValues={profile}
                  loading={
                    updateProfile.isPending
                  }
                  onSubmit={handleSubmit}
                />

              </ProfileCard>

            </div>

            <div>

              <ProfileCard>

                <ProfileInfo
                  profile={profile}
                />

              </ProfileCard>

            </div>

          </div>
        )}

      </DataState>
    </>
  );
}