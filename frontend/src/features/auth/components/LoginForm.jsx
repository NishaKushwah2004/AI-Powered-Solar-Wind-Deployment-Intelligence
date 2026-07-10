import { Link } from "react-router-dom";

import { Mail, Lock } from "lucide-react";

import {
  Button,
  Card,
  Checkbox,
  Input,
} from "@/components/ui";

import useZodForm from "@/hooks/useZodForm";

import loginSchema from "../schemas/loginSchema";

import { useLogin } from "../hooks/useLogin";

import { ROUTES } from "@/config/navigation/routes";

export default function LoginForm() {

  const {

    register,

    handleSubmit,

    formState: { errors },

  } = useZodForm(loginSchema);

  const loginMutation = useLogin();

  const onSubmit = (data) => {

    loginMutation.mutate(data);

  };

  return (

    <Card className="w-full max-w-md">

      <Card.Header>

        <h1 className="text-2xl font-bold">

          Welcome Back

        </h1>

        <p className="mt-1 text-sm text-slate-500">

          Sign in to continue

        </p>

      </Card.Header>

      <Card.Body>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <Input

            label="Email"

            type="email"

            placeholder="Enter your email"

            leftIcon={<Mail size={18} />}

            error={errors.email?.message}

            {...register("email")}

          />

          <Input

            label="Password"

            type="password"

            placeholder="Enter password"

            leftIcon={<Lock size={18} />}

            error={errors.password?.message}

            {...register("password")}

          />

          <Checkbox

            label="Remember Me"

          />

          <Button

            type="submit"

            loading={loginMutation.isPending}

            fullWidth

          >

            Login

          </Button>

        </form>

      </Card.Body>

      <Card.Footer>

        <p className="text-center text-sm">

          Don't have an account?{" "}

          <Link

            to={ROUTES.REGISTER}

            className="font-medium text-primary"

          >

            Register

          </Link>

        </p>

      </Card.Footer>

    </Card>

  );

}