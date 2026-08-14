import { forwardRef } from "react";

import FormField from "@/components/ui/FormField";
import { cn } from "@/utils/cn";

import {
  FORM_CONTROL,
  FORM_CONTROL_ERROR,
} from "@/constants/formStyles";

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
    const errorId = error
      ? `${id}-error`
      : undefined;

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
          aria-invalid={!!error}
          aria-describedby={errorId}
          className={cn(
            FORM_CONTROL,
            error && FORM_CONTROL_ERROR,
            className
          )}
          {...props}
        />
      </FormField>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;