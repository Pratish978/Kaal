"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import MeditationPlayer from './MeditationPlayer';

interface CardProps {
  title: string;
  duration: string;
  status: string;
  isFree?: boolean;
  audioSrc: string;
}

export default function MeditationCard({
  title,
  duration,
  status,
  isFree,
  audioSrc,
}: CardProps) {

  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Replace with your real auth logic
  const isLoggedIn = false;

  // First card always free
  const isFirstCard = isFree;

  // If logged in -> all unlocked
  // If logged out -> only free card unlocked
  const isUnlocked = isLoggedIn || isFirstCard;

  const handleCardClick = () => {
    if (isUnlocked) {
      setIsOpen(true);
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className={`bg-white rounded-[32px] p-7 text-left flex flex-col min-h-[240px] w-full transition-all duration-300
          ${
            isUnlocked
              ? 'shadow-[0_20px_50px_rgba(0,0,0,0.1)] cursor-pointer active:scale-[0.98]'
              : 'shadow-[0_10px_30px_rgba(0,0,0,0.04)] opacity-90 cursor-pointer'
          }`}
      >
        <div className="flex items-center justify-between mb-4">

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 relative flex-shrink-0">
              <Image
                src="/Home1.png"
                alt="Icon"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>

            <h4 className="font-bold text-[#333333] text-[17px] tracking-tight">
              {title}
            </h4>
          </div>

          {/* Locked Badge */}
          {!isUnlocked && (
            <span className="text-[12px] font-bold text-neutral-400 bg-neutral-100/70 px-2.5 py-1 rounded-xl">
              🔒 Locked
            </span>
          )}
        </div>

        <div className="grow">
          <p className="text-[#7D7D7D] text-[14px] leading-relaxed font-medium max-w-[90%]">
            Start your day with positive intentions and clarity for deeper support when you need it.
          </p>
        </div>

        <div className="flex justify-between items-center mt-6">

          <div
            className={`px-5 py-2 rounded-2xl text-[13px] font-bold
              ${
                isUnlocked
                  ? 'bg-[#E8F9E9] text-[#5CC489]'
                  : 'bg-[#FEF0E3] text-[#D48D5E]'
              }`}
          >
            {isUnlocked ? 'Free' : 'Locked'}
          </div>

          <span className="text-[13px] text-[#A5C683] font-bold">
            {duration}
          </span>
        </div>
      </div>

      {/* AUDIO MEDITATION PLAYER */}
      {isOpen && (
        <MeditationPlayer
          title={title}
          audioSrc={audioSrc}
          onClose={() => setIsOpen(false)}
        />
      )}

      {/* AUTH MODAL */}
      {showAuthModal && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowAuthModal(false)}
        >
          <div
            className="bg-white rounded-[32px] p-6 md:p-8 max-w-sm w-full text-center shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-3xl mb-3">🔒</div>

            <h3 className="text-lg font-bold text-neutral-800 mb-2">
              Unlock Premium Content
            </h3>

            <p className="text-xs text-neutral-500 mb-6 leading-relaxed">
              Sign in to unlock all meditation sessions.
            </p>

            <div className="flex flex-col gap-2">

              <button
                onClick={() => setShowAuthModal(false)}
                className="w-full py-3 rounded-xl bg-neutral-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-neutral-800 transition-all cursor-pointer"
              >
                Sign In / Register
              </button>

              <button
                onClick={() => setShowAuthModal(false)}
                className="w-full py-3 rounded-xl text-neutral-400 text-xs font-semibold hover:bg-neutral-50 transition-all cursor-pointer"
              >
                Maybe Later
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
}