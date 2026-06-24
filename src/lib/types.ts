import * as React from "react";

// Utility for type-safe slot forwarding
type SlotProps = React.HTMLAttributes<HTMLElement> & {
  asChild?: boolean;
};

export type { SlotProps };
