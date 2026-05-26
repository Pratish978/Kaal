"use client";

import React, { useState, useEffect, useMemo } from 'react';

import { supabase } from '@/app/utils/supabase';
import Navbar from '@/components/navbar';
import BreathingCircle from "@/components/Meditation1/BreathingCircle";
import MeditationCard from "@/components/Meditation1/MeditationCard";

export default function MeditationPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // Check Supabase Auth Session
  useEffect(() => {
    setHasMounted(true);

    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkUser();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const guidedSessions = useMemo(
    () => [
      {
        title: "Morning energy",
        duration: "4 mins",
        status: "Free",
        isFree: true, // Always free
        audioSrc: "/Music/morning.mp3",
      },

      {
        title: "Stress relief",
        duration: "5:01 mins",
        status: hasMounted && isLoggedIn ? "Free" : "Locked",
        isFree: hasMounted && isLoggedIn,
        audioSrc: "/Music/stress.mp3",
      },

      {
        title: "Deep calm",
        duration: "4:04 mins",
        status: hasMounted && isLoggedIn ? "Free" : "Locked",
        isFree: hasMounted && isLoggedIn,
        audioSrc: "/Music/deep.mp3",
      },
    ],
    [isLoggedIn, hasMounted]
  );

  return (
    <div className="bg-[#FBF9F6] min-h-screen">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 pb-20">

        {/* Breathing Circle */}
        <section className="w-full flex flex-col items-center justify-center py-10">
          <BreathingCircle/>
        </section>

        {/* Heading */}
        <section className="text-center mt-10 mb-8">
          <h2 className="text-3xl font-bold text-[#4a4a4a] mb-2">
            Guided Meditation
          </h2>

          <p className="text-[#a4adb7] italic text-sm mb-6">
            Choose an option
          </p>
        </section>

        {/* Meditation Cards */}
        <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {guidedSessions.map((session, index) => (
            <MeditationCard
              key={index}
              title={session.title}
              duration={session.duration}
              status={session.status}
              isFree={session.isFree}
              audioSrc={session.audioSrc}
            />
          ))}
        </section>

      </main>
    </div>
  );
}