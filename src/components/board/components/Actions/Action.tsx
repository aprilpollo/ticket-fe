import React, { forwardRef, CSSProperties } from "react";

import { classNames } from "@/utils";

import styles from "./Actions.module.css";

export interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: "light" | "dark" | "destructive";
  cursor?: CSSProperties["cursor"];
}

export const Action = forwardRef<HTMLButtonElement, Props>(
  ({ className, cursor, style, variant = "light", ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={classNames(styles.Action, styles[variant], className)}
        style={
          {
            ...style,
            cursor,
          } as CSSProperties
        }
      />
    );
  }
);
