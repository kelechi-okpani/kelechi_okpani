import { Navbar } from '@/components/navbar';

import { AboutSection } from '@/components/sections/about';
import { SkillsSection } from '@/components/sections/skills';
import { ExperienceSection } from '@/components/sections/experience';
import { ProjectsSection } from '@/components/sections/projects';


import { RelocationSection } from '@/components/sections/relocation';
import { ContactSection } from '@/components/sections/contact';
import { HeroSection } from '@/components/sections/hero';
import {HireMeSection} from "@/components/resources/HireMeSection";

export default function Page() {
  return (
    <main>

      <HeroSection />

      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
       <ProjectsSection />

        <HireMeSection />

      <ContactSection />
      
      {/* Footer */}
    </main>
  );
}
