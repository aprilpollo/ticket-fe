import React, {
  forwardRef,
  type HTMLAttributes,
  type PropsWithChildren,
} from "react";
import { Button as ButtonUI } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { classNames } from "@/utils";

export interface Props extends HTMLAttributes<HTMLElement> {
  actions?: React.ReactNode;
  accentColor?: string;
  shadow?: boolean;
  transitionId?: string;
  title?: string;
}

export const Item = forwardRef<HTMLElement, PropsWithChildren<Props>>(
  function Button(
    {
      actions,
      accentColor,
      children,
      shadow,
      style,
      transitionId,
      title,
      ...props
    },
    ref
  ) {
    // const Element = actions ? "div" : "button";

    return (
      <div
        {...props}
        className={classNames(
          "border rounded-sm bg-background p-2",
          shadow && "shadow-sm"
        )}
        data-accent-color={accentColor}
        ref={ref as any}
      >
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            {actions}
            <span className="text-sm line-clamp-1 pr-1">{title}</span>
          </div>
          <ButtonUI
            size="icon"
            variant="ghost"
            className="h-6 w-6 rounded-sm cursor-pointer"
          >
            <span className="sr-only">new task</span>
            <Ellipsis />
          </ButtonUI>
        </div>
        {children}
      </div>
    );
  }
);
