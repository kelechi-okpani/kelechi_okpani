import { Navbar } from '@/components/navbar';

import { AboutSection } from '@/components/sections/about';
import { SkillsSection } from '@/components/sections/skills';
import { ExperienceSection } from '@/components/sections/experience';
import { ProjectsSection } from '@/components/sections/projects';


import { RelocationSection } from '@/components/sections/relocation';
import { ContactSection } from '@/components/sections/contact';
import { HeroSection } from '@/components/sections/hero';

export default function Page() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
       <ProjectsSection />


      {/* <RelocationSection /> */}

      <ContactSection />
      
      {/* Footer */}
        <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Kelechi Okpani.
          </p>
        </div>
</footer>
    </main>
  );
}
