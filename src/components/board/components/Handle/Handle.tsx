import { forwardRef } from "react";

import { Action, ActionProps } from "../Actions";
import { Button } from "@/components/ui/button";
import { GripVertical } from "lucide-react";

export const Handle = forwardRef<HTMLButtonElement, ActionProps>(
  (props, ref) => {
    return (
      <Action
        ref={ref}
        cursor="grab"
        data-cypress="draggable-handle"
        {...props}
      >
        <svg viewBox="0 0 20 20" width="12">
          <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
        </svg>
      </Action>
    );
  }
);

export const HandleIcon = forwardRef<HTMLButtonElement>((props, ref) => {
  return (
    <Button
      ref={ref}
      data-cypress="draggable-handle"
      size="icon"
      variant="ghost"
      className="h-6 w-6 rounded-sm cursor-move"
      {...props}
    >
      <GripVertical />
    </Button>
  );
});
