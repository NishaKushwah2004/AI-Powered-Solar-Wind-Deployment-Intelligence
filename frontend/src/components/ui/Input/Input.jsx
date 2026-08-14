import { forwardRef } from "react";

import FormField from "@/components/ui/FormField";
import { cn } from "@/utils/cn";
import {
  FORM_CONTROL,
  FORM_CONTROL_ERROR,
} from "../../../constants/formStyles.js";

const Input = forwardRef(
  (
    {
      id,
      label,
      error,
      helperText,
      required = false,
      leftIcon,
      rightIcon,
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
        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              {leftIcon}
            </div>
          )}

          <input
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

          {rightIcon && (
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              {rightIcon}
            </div>
          )}
        </div>
      </FormField>
    );
  }
);

Input.displayName = "Input";

export default Input;