import React, { forwardRef } from "react";
import { classNames } from "@/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CirclePlus, Ellipsis } from "lucide-react";

export interface Props {
  children: React.ReactNode;
  actions?: React.ReactNode;
  label?: string;
  scrollable?: boolean;
  shadow?: boolean;
  style?: React.CSSProperties;
  transitionId?: string;
}

//ab_cd -> Ab Cd
const replaceName = (name: string) => {
  return name.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

export const Container = forwardRef<HTMLDivElement, Props>(
  (
    {
      actions,
      children,
      label,
      style,
      scrollable,
      shadow,
      transitionId,
      ...props
    }: Props,
    ref
  ) => {
    return (
      <div
        {...props}
        ref={ref}
        style={
          {
            ...style,
            viewTransitionName: transitionId,
          } as React.CSSProperties
        }
        className={classNames(
          shadow && "shadow-md",
          "w-72 bg-background border rounded-md overflow-hidden h-fit scrollable"
        )}
      >
        {label ? (
          <div className="flex items-center justify-between sticky top-0 z-10 bg-background cursor-move">
            <div className="flex gap-1 items-center p-2">
              <Badge
                variant="secondary"
                className="rounded-sm cursor-default font-medium"
              >
                {replaceName(label)}
              </Badge>
            </div>
            <div className="p-2 flex gap-1 items-center">
              <Badge
                className="min-w-5 px-1 cursor-default font-medium"
                variant="secondary"
              >
                {React.Children.count(children)}
              </Badge>
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 rounded-sm cursor-pointer"
              >
                <Ellipsis />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 rounded-sm cursor-pointer"
              >
                <CirclePlus />
              </Button>
            </div>
          </div>
        ) : null}

        <ul id={label} className="flex flex-grow flex-col gap-2 p-2 min-h-10">
          {children}
          {React.Children.count(children) == 0 && (
            <span className="text-xs text-center text-neutral-400">
              No items
            </span>
          )}
        </ul>
      </div>
    );
  }
);
