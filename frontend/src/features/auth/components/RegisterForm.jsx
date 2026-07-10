import { Link } from "react-router-dom";

import { User, Mail, Lock } from "lucide-react";

import {
  Button,
  Card,
  Input,
  Select,
} from "@/components/ui";


import useZodForm from "@/hooks/useZodForm";

import registerSchema from "../schemas/registerSchema";

import { useRegister } from "../hooks/useRegister";

import { ROUTES } from "@/config/navigation/routes";

export default function RegisterForm() {

  const {

    register,

    handleSubmit,

    formState: { errors },

  } = useZodForm(registerSchema);

  const registerMutation = useRegister();

  const onSubmit = (data) => {

    delete data.confirm_password;

    registerMutation.mutate(data);

  };

  return (

    <Card className="w-full max-w-lg">

      <Card.Header>

        <h1 className="text-2xl font-bold">

          Create Account

        </h1>

      </Card.Header>

      <Card.Body>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <Input

            label="Full Name"

            leftIcon={<User size={18} />}

            error={errors.full_name?.message}

            {...register("full_name")}

          />

          <Input

            label="Email"

            type="email"

            leftIcon={<Mail size={18} />}

            error={errors.email?.message}

            {...register("email")}

          />

          <Input

            label="Password"

            type="password"

            leftIcon={<Lock size={18} />}

            error={errors.password?.message}

            {...register("password")}

          />

          <Input

            label="Confirm Password"

            type="password"

            leftIcon={<Lock size={18} />}

            error={errors.confirm_password?.message}

            {...register("confirm_password")}

          />

          <Select

            label="Role"

            options={[
              {
                label: "Project Manager",
                value: 2,
              },
              {
                label: "GIS Analyst",
                value: 3,
              },
              {
                label: "Renewable Energy Planner",
                value: 4,
              },
            ]}

            error={errors.role_id?.message}

            {...register("role_id", {

              valueAsNumber: true,

            })}

          />

          <Button

            type="submit"

            loading={registerMutation.isPending}

            fullWidth

          >

            Register

          </Button>

        </form>

      </Card.Body>

      <Card.Footer>

        <p className="text-center text-sm">

          Already have an account?{" "}

          <Link

            className="text-primary"

            to={ROUTES.LOGIN}

          >

            Login

          </Link>

        </p>

      </Card.Footer>

    </Card>

  );

}