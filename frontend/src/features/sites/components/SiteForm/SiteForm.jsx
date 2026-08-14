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
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
    >
      <FormSection
        title="Site Information"
        description="Enter the details of the site."
      >
        <Input
          label="Site Name"
          placeholder="Enter site name"
          autoComplete="off"
          disabled={loading}
          error={errors.name?.message}
          {...register("name")}
        />

        <Textarea
          label="Description"
          placeholder="Enter site description"
          disabled={loading}
          error={errors.description?.message}
          {...register("description")}
        />

        <Select
          label="Project"
          placeholder="Select Project"
          options={projectOptions}
          disabled={loading}
          error={errors.project_id?.message}
          {...register("project_id", {
            valueAsNumber: true,
          })}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <Input
            type="number"
            step="any"
            label="Latitude"
            placeholder="e.g. 23.1815"
            disabled={loading}
            error={errors.latitude?.message}
            {...register("latitude")}
          />

          <Input
            type="number"
            step="any"
            label="Longitude"
            placeholder="e.g. 79.9864"
            disabled={loading}
            error={errors.longitude?.message}
            {...register("longitude")}
          />
        </div>
      </FormSection>

      <div className="flex justify-end">
        <Button
          type="submit"
          loading={loading}
          disabled={loading}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}