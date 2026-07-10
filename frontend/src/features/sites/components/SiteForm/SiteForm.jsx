import {
  Button,
  Input,
  Select,
  Textarea,
} from "@/components/ui";

import { FormSection } from "@/components/forms";

import useZodForm from "@/hooks/useZodForm";

import siteSchema from "../../schemas/siteSchema";

import { useProjects } from "@/features/projects";

export default function SiteForm({
  defaultValues = {
    name: "",
    description: "",
    latitude: "",
    longitude: "",
    project_id: "",
  },

  loading = false,

  submitLabel = "Save Site",

  onSubmit,
}) {
  const {
    data: projects = [],
  } = useProjects();

  const projectOptions = projects.map(
    (project) => ({
      label: project.name,
      value: project.id,
    })
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useZodForm(siteSchema, {
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
    >
      <FormSection
        title="Site Information"
        description="Enter the details of the site."
      >
        <Input
          label="Site Name"
          {...register("name")}
          error={errors.name?.message}
        />

        <Textarea
          label="Description"
          {...register("description")}
          error={
            errors.description?.message
          }
        />

        <Select
          label="Project"
          options={projectOptions}
          {...register("project_id")}
          error={
            errors.project_id?.message
          }
        />

        <div className="grid gap-6 md:grid-cols-2">

          <Input
            type="number"
            step="any"
            label="Latitude"
            {...register("latitude")}
            error={
              errors.latitude?.message
            }
          />

          <Input
            type="number"
            step="any"
            label="Longitude"
            {...register("longitude")}
            error={
              errors.longitude?.message
            }
          />

        </div>

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