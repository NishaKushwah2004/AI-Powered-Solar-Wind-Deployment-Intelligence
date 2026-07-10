import { LoaderCircle } from "lucide-react";

import { buttonVariants } from "./buttonVariants";

import { cn } from "@/utils/cn";

export default function Button({

    children,

    variant,

    size,

    loading,

    icon,

    className,

    ...props

}){

    return(

        <button

            className={cn(

                buttonVariants({

                    variant,

                    size,

                }),

                className

            )}

            disabled={loading || props.disabled}

            {...props}

        >

            {

                loading ?

                <LoaderCircle

                    className="mr-2 h-4 w-4 animate-spin"

                />

                :

                icon

            }

            {children}

        </button>

    );

}