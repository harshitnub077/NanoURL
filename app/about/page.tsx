import { AboutHero } from '@/components/about/about-hero';
import { AboutStory } from '@/components/about/about-story';
import { AboutMission } from '@/components/about/about-mission';
import { AboutValues } from '@/components/about/about-values';
import { AboutDeveloper } from '@/components/about/about-developer';

export default function About() {
  return (
    <div className="flex flex-col items-center w-full">
      <AboutHero />
      <AboutStory />
      <AboutMission />
      <AboutValues />
      <AboutDeveloper />
    </div>
  );
}