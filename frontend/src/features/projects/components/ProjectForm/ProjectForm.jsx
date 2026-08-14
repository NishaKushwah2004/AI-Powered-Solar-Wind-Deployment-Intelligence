import {
  Button,
  Input,
  Textarea,
} from "@/components/ui";

import { FormSection } from "@/components/forms";

import useZodForm from "@/hooks/useZodForm";

import projectSchema from "../../schemas/projectSchema";


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
      noValidate
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
          autoComplete="off"
          disabled={loading}
          error={errors.name?.message}
          {...register("name")}
        />

        <Textarea
          label="Description"
          placeholder="Project description"
          disabled={loading}
          error={errors.description?.message}
          {...register("description")}
        />
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