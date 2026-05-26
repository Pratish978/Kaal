"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui1/card";
import { Button } from "@/components/ui1/button";

interface FeatureCardProps {
  icon: string; // Toggling back to your image path strings
  title: string;
  description: string;
  href: string;
}

function FeatureCard({ icon, title, description, href }: FeatureCardProps) {
  return (
    /* Aapka original styled card framework humne Shadcn design tokens par mount kiya hai */
    <Card className="bg-white px-2 py-2 rounded-[2rem] shadow-lg shadow-gray-200/50 border border-gray-100 flex flex-col items-start overflow-hidden">
      <CardContent className="p-6 w-full flex flex-col items-start h-full justify-between">
        <div className="w-full">
          {/* Icon wrapper - 4mb layout */}
          <div className="mb-4">
            <img
              src={icon}
              alt={title}
              className="w-10 h-10 object-contain"
            />
          </div>

          {/* Title header */}
          <h3 className="font-bold text-[#333] text-lg mb-2 tracking-tight">
            {title}
          </h3>

          {/* Description text with custom Serif typography setup */}
          <p className="font-serif text-[15px] text-gray-400 mb-6 leading-snug min-h-[60px]">
            {description}
          </p>
        </div>

        {/* Action Button - Fully fluid width matching your click animations */}
        <Link href={href} className="w-full block">
          <Button className="w-full bg-[#E9B666] hover:bg-[#dfa755] text-white py-6 rounded-full font-bold text-base transition-all shadow-sm active:scale-95 cursor-pointer border-0">
            Start
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default function SupportSection() {
  // Merged array combining your precise page routing (like /quiz) and icon states
  const features = [
    {
      title: "Meditation",
      icon: "/Home1.png",
      description: "Take a few gentle minutes to settle your thoughts and body.",
      href: "Meditation"
    },
    {
      title: "Talk to a Psychologist",
      icon: "/Home2.png",
      description: "Connect with a trained professional for deeper support when you need it.",
      href: "/quiz"
    },
    {
      title: "Events",
      icon: "/Home3.png",
      description: "Answer a few questions to understand how you've been feeling lately.",
      href: "/events"
    },
  ];

  return (
    <section className="py-10 px-6 w-full bg-secondary">
      {/* Centered context notice from your setup */}
      <p className="text-center text-[11px] md:text-sm text-gray-600 italic mb-10 max-w-xs mx-auto md:max-w-none leading-relaxed">
        If you&apos;d like additional support, these options are available.
      </p>

      {/* Main card distribution viewport structure */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <FeatureCard 
            key={feature.title} 
            title={feature.title}
            icon={feature.icon}
            description={feature.description}
            href={feature.href}
          />
        ))}
      </div>
    </section>
  );
}