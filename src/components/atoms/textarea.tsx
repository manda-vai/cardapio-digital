import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  wrapperClassName?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, wrapperClassName, id, required, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
        {label && (
          <label
            htmlFor={textareaId}
            className="text-label-md text-on-surface-variant font-medium"
          >
            {label}
            {required && (
              <span className="text-error ml-0.5" aria-hidden="true">*</span>
            )}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          required={required}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          className={cn(
            "w-full px-3 py-2.5 bg-surface-variant text-on-surface placeholder:text-on-surface-variant/60",
            "rounded-radius-sm border-0 border-b-2 border-transparent",
            "transition-all duration-200 min-h-[80px] resize-y",
            "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-0",
            error && "border-error focus-visible:border-error",
            "disabled:opacity-38 disabled:cursor-not-allowed",
            className
          )}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="text-label-sm text-error mt-0.5" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea, type TextareaProps };
