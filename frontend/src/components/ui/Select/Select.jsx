import { forwardRef } from "react";

import FormField from "@/components/ui/FormField";
import { cn } from "@/utils/cn";

import {
  FORM_CONTROL,
  FORM_CONTROL_ERROR,
} from "@/constants/formStyles";

const Select = forwardRef(
  (
    {
      id,
      label,
      options = [],
      error,
      helperText,
      required = false,
      placeholder = "Select an option",
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
        <select
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
        >
          <option
            value=""
            disabled
          >
            {placeholder}
          </option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </FormField>
    );
  }
);

Select.displayName = "Select";

export default Select;