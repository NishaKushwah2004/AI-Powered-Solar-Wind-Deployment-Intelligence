import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

import useAuth from "../../hooks/useAuth";

export default function Login() {
    const navigate = useNavigate();

    const { login, loading } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            await login(
                data.email,
                data.password
            );

            toast.success("Login successful!");

            navigate("/");
        } catch (error) {
            toast.error(
                error?.response?.data?.detail ??
                "Invalid email or password."
            );
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100">
            <Card className="w-full max-w-md">

                <h1 className="mb-6 text-center text-2xl font-bold">
                    Solar & Wind Deployment Intelligence
                </h1>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >

                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        {...register("email", {
                            required: "Email is required",
                        })}
                        error={errors.email?.message}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                        error={errors.password?.message}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        loading={loading}
                    >
                        Login
                    </Button>

                </form>

            </Card>
        </div>
    );
}