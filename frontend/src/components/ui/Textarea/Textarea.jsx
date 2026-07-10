import { forwardRef } from "react";

import FormField from "@/components/ui/FormField";
import { cn } from "@/utils/cn";

import { FORM_CONTROL, FORM_CONTROL_ERROR, } from "@/constants/formStyles";

const Textarea = forwardRef(
  (
    {
      id,
      label,
      error,
      helperText,
      required = false,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <FormField
        id={id}
        label={label}
        required={required}
        error={error}
        helperText={helperText}
      >
        <textarea
          ref={ref}
          id={id}
          className={cn(
            FORM_CONTROL,
            error && FORM_CONTROL_ERROR,
            className
          )}
          aria-invalid={!!error}
          {...props}
        />
      </FormField>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;