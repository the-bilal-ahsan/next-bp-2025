"use client";

import React, { useState } from "react";
import { Button, Card, CardContent } from "@mui/material";
import {
  FadeWrapper,
  GrowWrapper,
  SlideWrapper,
  ZoomWrapper,
  CollapseWrapper,
} from "@/components/animations/AnimatedWrappers";

const DemoAnimations = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-4 p-4">
      <Button variant="contained" onClick={() => setShow((prev) => !prev)}>
        Toggle Animations
      </Button>

      <FadeWrapper in={show}>
        <Card>
          <CardContent>Fade Animation</CardContent>
        </Card>
      </FadeWrapper>

      <GrowWrapper in={show}>
        <Card>
          <CardContent>Grow Animation</CardContent>
        </Card>
      </GrowWrapper>

      <SlideWrapper in={show} direction="left">
        <Card>
          <CardContent>Slide Animation</CardContent>
        </Card>
      </SlideWrapper>

      <ZoomWrapper in={show}>
        <Card>
          <CardContent>Zoom Animation</CardContent>
        </Card>
      </ZoomWrapper>

      <CollapseWrapper in={show}>
        <Card>
          <CardContent>Collapse Animation</CardContent>
        </Card>
      </CollapseWrapper>
    </div>
  );
};

export default DemoAnimations;
