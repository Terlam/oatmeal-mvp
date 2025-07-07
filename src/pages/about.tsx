import React from "react";
import { PhilosophySection, ToolListSection, CallToActionSection, OriginStorySection} from "@features/about";

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
