import {
  Button,
  Input,
} from "@/components/ui";

import { FormSection } from "@/components/forms";

import useZodForm from "@/hooks/useZodForm";

import profileSchema from "../../schemas/profileSchema";

export default function ProfileForm({
  defaultValues,

  loading,

  onSubmit,
}) {
  const {
    register,

    handleSubmit,

    formState: {
      errors,
    },
  } = useZodForm(
    profileSchema,
    {
      defaultValues,
    }
  );

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="space-y-8"
    >
      <FormSection
        title="Personal Information"
        description="Update your profile details."
      >
        <Input
          label="Full Name"
          {...register(
            "full_name"
          )}
          error={
            errors.full_name
              ?.message
          }
        />

        <Input
          label="Email"
          value={
            defaultValues.email
          }
          disabled
        />

      </FormSection>

      <div className="flex justify-end">

        <Button
          type="submit"
          loading={loading}
        >
          Save Changes
        </Button>

      </div>

    </form>
  );
}