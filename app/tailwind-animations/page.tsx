"use client";

import React, { useState } from "react";
import { FadeWrapper, GrowWrapper, SlideWrapper, ZoomWrapper, CollapseWrapper } from "@/components/animations/TwAnimatedWrappers";

const DemoTailwindAnimations = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-6 p-6">
      <button
        onClick={() => setShow((prev) => !prev)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Toggle Animations
      </button>

      <FadeWrapper show={show}>
        <div className="p-4 bg-gray-200 rounded-lg">Fade Animation</div>
      </FadeWrapper>

      <GrowWrapper show={show}>
        <div className="p-4 bg-green-200 rounded-lg">Grow Animation</div>
      </GrowWrapper>

      <SlideWrapper show={show} direction="left">
        <div className="p-4 bg-yellow-200 rounded-lg">Slide Animation</div>
      </SlideWrapper>

      <ZoomWrapper show={show}>
        <div className="p-4 bg-purple-200 rounded-lg">Zoom Animation</div>
      </ZoomWrapper>

      <CollapseWrapper show={show}>
        <div className="p-4 bg-red-200 rounded-lg">Collapse Animation</div>
      </CollapseWrapper>
    </div>
  );
};

export default DemoTailwindAnimations;
