import { cn } from "@/utils/cn";

function Card({

    children,

    className,

}){

    return(

        <div

            className={cn(

                "rounded-2xl border bg-white shadow-sm",

                className

            )}

        >

            {children}

        </div>

    );

}

function CardHeader({

    children,

    className,

}){

    return(

        <div

            className={cn(

                "border-b p-6",

                className

            )}

        >

            {children}

        </div>

    );

}

function CardBody({

    children,

    className,

}){

    return(

        <div

            className={cn(

                "p-6",

                className

            )}

        >

            {children}

        </div>

    );

}

function CardFooter({

    children,

    className,

}){

    return(

        <div

            className={cn(

                "border-t p-6",

                className

            )}

        >

            {children}

        </div>

    );

}

Card.Header=CardHeader;

Card.Body=CardBody;

Card.Footer=CardFooter;

export default Card;