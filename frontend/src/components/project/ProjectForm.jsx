import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Button from "../ui/Button";
import Input from "../ui/Input";

export default function ProjectForm({
    initialData = null,
    loading = false,
    onSubmit,
}) {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {

        if (initialData) {

            reset(initialData);

        }

    }, [initialData, reset]);

    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
        >

            <Input
                label="Project Name"
                {...register(
                    "name",
                    {
                        required: "Project name is required",
                    }
                )}
                error={errors.name?.message}
            />

            <Input
                label="Region"
                {...register("region")}
            />

            <Input
                label="Description"
                {...register("description")}
            />

            <Button
                type="submit"
                loading={loading}
                className="w-full"
            >
                {initialData
                    ? "Update Project"
                    : "Create Project"}
            </Button>

        </form>

    );
  
}