// src/components/animations/AnimatedWrappers.tsx
"use client";

import React, { ReactNode } from "react";
import {
  Fade,
  Grow,
  Slide,
  Zoom,
  Collapse,
  FadeProps,
  GrowProps,
  SlideProps,
  ZoomProps,
  CollapseProps,
} from "@mui/material";

// Generic type for wrappers
interface WrapperProps {
  in?: boolean; // trigger animation
  children: ReactNode;
  timeout?: number | { appear?: number; enter?: number; exit?: number };
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
}

// Fade Wrapper
export const FadeWrapper: React.FC<WrapperProps & FadeProps> = ({
  in: inProp = true,
  timeout = 500,
  mountOnEnter = true,
  unmountOnExit = true,
  children,
  ...rest
}) => (
  <Fade
    in={inProp}
    timeout={timeout}
    mountOnEnter={mountOnEnter}
    unmountOnExit={unmountOnExit}
    {...rest}
  >
    <div>{children}</div>
  </Fade>
);

// Grow Wrapper
export const GrowWrapper: React.FC<WrapperProps & GrowProps> = ({
  in: inProp = true,
  timeout = 500,
  mountOnEnter = true,
  unmountOnExit = true,
  children,
  ...rest
}) => (
  <Grow
    in={inProp}
    timeout={timeout}
    mountOnEnter={mountOnEnter}
    unmountOnExit={unmountOnExit}
    {...rest}
  >
    <div>{children}</div>
  </Grow>
);

// Slide Wrapper
export const SlideWrapper: React.FC<
  WrapperProps & SlideProps & { direction?: SlideProps["direction"] }
> = ({
  in: inProp = true,
  timeout = 500,
  direction = "up",
  mountOnEnter = true,
  unmountOnExit = true,
  children,
  ...rest
}) => (
  <Slide
    in={inProp}
    timeout={timeout}
    direction={direction}
    mountOnEnter={mountOnEnter}
    unmountOnExit={unmountOnExit}
    {...rest}
  >
    <div>{children}</div>
  </Slide>
);

// Zoom Wrapper
export const ZoomWrapper: React.FC<WrapperProps & ZoomProps> = ({
  in: inProp = true,
  timeout = 500,
  mountOnEnter = true,
  unmountOnExit = true,
  children,
  ...rest
}) => (
  <Zoom
    in={inProp}
    timeout={timeout}
    mountOnEnter={mountOnEnter}
    unmountOnExit={unmountOnExit}
    {...rest}
  >
    <div>{children}</div>
  </Zoom>
);

// Collapse Wrapper
export const CollapseWrapper: React.FC<WrapperProps & CollapseProps> = ({
  in: inProp = true,
  timeout = 500,
  mountOnEnter = true,
  unmountOnExit = true,
  children,
  ...rest
}) => (
  <Collapse
    in={inProp}
    timeout={timeout}
    mountOnEnter={mountOnEnter}
    unmountOnExit={unmountOnExit}
    {...rest}
  >
    <div>{children}</div>
  </Collapse>
);
