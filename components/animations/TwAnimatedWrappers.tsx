// src/components/animations/TwAnimatedWrappers.tsx
"use client";

import React, { ReactNode } from "react";
import clsx from "clsx";

interface WrapperProps {
  show?: boolean;
  children: ReactNode;
  duration?: number; // in ms
  direction?: "up" | "down" | "left" | "right";
}

// Fade Wrapper
export const FadeWrapper: React.FC<WrapperProps> = ({
  show = true,
  duration = 500,
  children,
}) => (
  <div
    className={clsx(
      "transition-opacity ease-in-out",
      show ? "opacity-100" : "opacity-0"
    )}
    style={{ transitionDuration: `${duration}ms` }}
  >
    {children}
  </div>
);

// Scale/Grow Wrapper
export const GrowWrapper: React.FC<WrapperProps> = ({
  show = true,
  duration = 500,
  children,
}) => (
  <div
    className={clsx(
      "transition-transform ease-in-out",
      show ? "scale-100 opacity-100" : "scale-0 opacity-0"
    )}
    style={{ transitionDuration: `${duration}ms` }}
  >
    {children}
  </div>
);

// Slide Wrapper
export const SlideWrapper: React.FC<WrapperProps> = ({
  show = true,
  duration = 500,
  direction = "up",
  children,
}) => {
  const directionClasses: Record<string, string> = {
    up: "translate-y-full",
    down: "-translate-y-full",
    left: "translate-x-full",
    right: "-translate-x-full",
  };

  return (
    <div
      className={clsx(
        "transition-transform ease-in-out",
        show ? "translate-x-0 translate-y-0 opacity-100" : directionClasses[direction],
        show ? "opacity-100" : "opacity-0"
      )}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
};

// Zoom Wrapper
export const ZoomWrapper: React.FC<WrapperProps> = ({
  show = true,
  duration = 500,
  children,
}) => (
  <div
    className={clsx(
      "transition-transform ease-in-out",
      show ? "scale-100 opacity-100" : "scale-50 opacity-0"
    )}
    style={{ transitionDuration: `${duration}ms` }}
  >
    {children}
  </div>
);

// Collapse Wrapper
export const CollapseWrapper: React.FC<WrapperProps> = ({
  show = true,
  duration = 500,
  children,
}) => (
  <div
    className={clsx(
      "overflow-hidden transition-all ease-in-out",
      show ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
    )}
    style={{ transitionDuration: `${duration}ms` }}
  >
    {children}
  </div>
);
