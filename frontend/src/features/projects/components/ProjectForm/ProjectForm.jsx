import {
  Button,
  Input,
  Select,
  Textarea,
} from "@/components/ui";

import { FormSection } from "@/components/forms";

import useZodForm from "@/hooks/useZodForm";

import projectSchema from "../../schemas/projectSchema";

import { REGIONS } from "@/constants/regions";

export default function ProjectForm({
  defaultValues = {
    name: "",
    description: "",
    region: "",
  },

  loading = false,

  submitLabel = "Save Project",

  onSubmit,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useZodForm(projectSchema, {
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
    >
      <FormSection
        title="Basic Information"
        description="Enter the basic details of the project."
      >
        <Input
          label="Project Name"
          placeholder="Enter project name"
          error={errors.name?.message}
          {...register("name")}
        />

        <Textarea
          label="Description"
          placeholder="Project description"
          error={errors.description?.message}
          {...register("description")}
        />

        <Select
          label="Region"
          placeholder="Select region"
          options={REGIONS}
          error={errors.region?.message}
          {...register("region")}
        />
      </FormSection>

      <div className="flex justify-end">
        <Button
          type="submit"
          loading={loading}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}