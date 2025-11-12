import React from "react";
import { PhilosophySection } from "../features/about/PhilosophySection";
import { ToolListSection } from "../features/about/ToolListSection";
import { CallToActionSection } from "../features/about/CallToActionSection";
import { OriginStorySection } from "../features/about/OriginStorySection";

const AboutPage = () => {
  return (
    <main className="flex flex-col">
      <PhilosophySection />
      <OriginStorySection />
      <ToolListSection />
      <CallToActionSection />
    </main>
  );
};

export default AboutPage;
