import { cn } from "@/utils/cn";

export const buttonVariants = ({

    variant = "primary",

    size = "md",

    fullWidth = false,

}) => {

    return cn(

        "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200",

        "disabled:pointer-events-none disabled:opacity-50",

        "focus:outline-none focus:ring-2 focus:ring-offset-2",

        {

            "bg-teal-500 text-white hover:bg-teal-600":
                variant === "primary",

            "bg-red-500 text-white hover:bg-red-600":
                variant === "danger",

            "bg-green-500 text-white hover:bg-green-600":
                variant === "success",

            "border border-gray-300 bg-white hover:bg-gray-100":
                variant === "outline",

            "hover:bg-gray-100":
                variant === "ghost",

        },

        {

            "h-9 px-3 text-sm":
                size === "sm",

            "h-11 px-5":
                size === "md",

            "h-14 px-8 text-lg":
                size === "lg",

        },

        fullWidth && "w-full"

    );

};