"use client";

import { useState } from "react";

import { Button } from "@/components/ui1/button";
import { Card, CardContent } from "@/components/ui1/card";
import SupportSection from "../components/ui/SupportSection";

import Navbar from "@/components/navbar";


export default function Home() {
  const [showChat, setShowChat] = useState(false);

  const handleBack = () => setShowChat(false);

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar onBack={handleBack} forceBack={showChat} />

      {!showChat ? (
        <>
          <div className="flex-1 flex flex-col justify-center items-center px-4 py-10 md:py-12">
            <Card className="w-full max-w-2xl bg-secondary/40 border-0 shadow-none rounded-[30px] md:rounded-[40px] relative overflow-hidden backdrop-blur-md">
              <CardContent className="p-8 md:p-12 text-center">
                
                <h1 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mt-6 md:mt-8 mb-6 md:mb-8 px-2 leading-tight">
                  How are you feeling right now?
                </h1>
                
                <p className="text-muted-foreground text-xs md:text-sm mb-6 italic opacity-80">
                  (Take a moment, there's no rush.)
                </p>
                
                <div className="space-y-4 mb-8 text-muted-foreground text-xs md:text-sm px-4 leading-relaxed max-w-md mx-auto">
                  <p>
                    You can take your time.<br className="hidden md:block"/>
                    This is a safe, calm space to talk freely.
                  </p>
                </div>
                
                <div className="flex justify-center px-4">
                  <Button 
                    onClick={() => setShowChat(true)} 
                    className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 rounded-full font-medium shadow-md transition cursor-pointer active:scale-95"
                  >
                    Start conversation
                  </Button>
                </div>
                
                <div className="mt-10 md:mt-14 mb-4 text-[10px] md:text-[11px] text-muted-foreground/70 leading-tight tracking-wider px-6 uppercase">
                  KAAL AI is not a doctor.<br className="md:hidden"/>
                  It listens with care and may suggest professional help when needed.
                </div>

              </CardContent>
            </Card>
          </div>

          <SupportSection />
        </>
      ) : (
        <div className="grow flex flex-col">
          <chat-interface/>
        </div>
      )}
    </main>
  );
}