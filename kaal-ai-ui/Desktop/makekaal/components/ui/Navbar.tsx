"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation"; 
import { ChevronLeft, X, Menu, LogOut, Clock } from "lucide-react";
import { supabase } from "@/app/utils/supabase"; 
import AuthModal from "../auth/AuthModal";
import ChatInterface from "../chat/ChatInterface"; 

interface NavbarProps {
  onBack?: () => void;
  forceBack?: boolean; 
}

const Navbar = ({ onBack, forceBack }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showChat, setShowChat] = useState(false); 
  const [user, setUser] = useState<any>(null);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  
  const showBack = forceBack || pathname !== "/" || showChat;

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBack = () => {
    if (showChat) {
      setShowChat(false);
    } else if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsOpen(false);
    setIsDropdownOpen(false);
    setShowChat(false);
    router.push("/");
  };

  const navigateTo = (path: string) => {
    router.push(path);
    setIsDropdownOpen(false);
    setIsOpen(false);
    setShowChat(false); 
  };

  return (
    <>
      <nav className="relative flex items-center justify-between px-4 md:px-16 py-4 md:py-6 bg-transparent w-full z-[200]">
        
        <div className="flex flex-1 items-center">
          <div className="hidden md:block">
            {showBack ? (
              <button 
                onClick={handleBack} 
                className="flex items-center gap-1 text-gray-400 hover:text-black transition-colors bg-transparent border-none cursor-pointer p-0 group"
              >
                <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                <span className="text-xs uppercase tracking-widest font-bold">Back</span>
              </button>
            ) : (
              <div className="relative w-28 h-10 cursor-pointer" onClick={() => navigateTo("/")}>
                <Image src="/kaal-logo.png" alt="KAAL AI Logo" fill sizes="112px" className="object-contain" priority />
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(true)} 
              className="text-gray-800 bg-transparent border-none cursor-pointer p-1 -ml-1"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>

        <div className="md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative w-20 h-8 cursor-pointer" onClick={() => navigateTo("/")}>
            <Image src="/kaal-logo.png" alt="KAAL AI Logo" fill sizes="80px" className="object-contain" priority />
          </div>
        </div>

        <div className="flex flex-1 justify-end items-center">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <div 
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="text-gray-600 text-sm font-medium hidden sm:block italic group-hover:text-black transition-colors">
                  Hi, Pratish Bhongle
                </span>
                <div className="w-9 h-9 rounded-full bg-[#E9B87D] flex items-center justify-center text-white font-bold shadow-sm group-hover:scale-105 transition-transform">
                  P
                </div>
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-[#D9D9D9] rounded-2xl shadow-xl border border-gray-200 py-5 px-6 animate-in fade-in slide-in-from-top-2 duration-200 z-[210]">
                  <div className="flex flex-col gap-4 items-start">
                    <button 
                      onClick={() => { setShowChat(true); setIsDropdownOpen(false); }} 
                      className="text-[#6B5E4C] font-medium hover:text-black transition-colors text-sm bg-transparent border-none p-0 text-left cursor-pointer"
                    >
                      Talk to KAAL
                    </button>

                    <button 
                      onClick={() => navigateTo('/history')} 
                      className="text-[#6B5E4C] font-medium hover:text-black transition-colors text-sm bg-transparent border-none p-0 text-left cursor-pointer"
                    >
                      History
                    </button>

                    <div className="w-full h-[1px] bg-gray-300 my-1" />

                    <button onClick={() => navigateTo('/meditation')} className="text-[#6B5E4C] font-medium hover:text-black text-sm bg-transparent border-none p-0 text-left cursor-pointer">Meditation</button>
                    <button onClick={() => navigateTo('/reflect')} className="text-[#6B5E4C] font-medium hover:text-black text-sm bg-transparent border-none p-0 text-left cursor-pointer">Reflect and Connect</button>
                    <button onClick={handleLogout} className="text-[#6B5E4C] font-medium hover:text-red-600 text-sm mt-1 bg-transparent border-none p-0 text-left cursor-pointer">Log out</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={() => setIsAuthOpen(true)}
              className="hidden md:block text-gray-600 font-medium hover:text-black text-sm tracking-widest hover:underline underline-offset-8 cursor-pointer"
            >
              Log in
            </button>
          )}
        </div>
      </nav>

      {showChat && (
        <div className="fixed inset-0 bg-[#FBF9F6] z-[100] animate-in fade-in slide-in-from-bottom-4 duration-500 pt-20">
           <ChatInterface />
        </div>
      )}

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      <div className={`fixed top-0 left-0 h-full w-[85%] bg-[#FBF9F6] shadow-2xl z-[300] transform transition-transform duration-500 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full p-8">
          <button onClick={() => setIsOpen(false)} className="self-end p-2 text-gray-400 cursor-pointer">
            <X className="w-8 h-8" />
          </button>
          
          <div className="mt-12 flex-1">
            {user ? (
              <div className="space-y-8">
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Welcome back</p>
                  <h2 className="text-3xl font-serif text-gray-800">Hi, Pratish</h2>
                </div>
                
                <nav className="flex flex-col gap-6">
                  <button onClick={() => { setShowChat(true); setIsOpen(false); }} className="bg-[#E9B87D] text-white px-6 py-2.5 rounded-full text-[14px] font-medium shadow-sm cursor-pointer">Talk to KAAL</button>
                  <button onClick={() => navigateTo('/history')} className="flex items-center gap-2 text-xl text-gray-700 bg-transparent border-none text-left cursor-pointer">History</button>
                  <button onClick={() => navigateTo('/meditation')} className="text-xl text-gray-700 bg-transparent border-none text-left cursor-pointer">Meditation</button>
                  <button onClick={() => navigateTo('/reflect')} className="text-xl text-gray-700 bg-transparent border-none text-left cursor-pointer">Reflect and Connect</button>
                </nav>
              </div>
            ) : (
              <button className="text-left text-4xl font-serif text-gray-800 bg-transparent cursor-pointer" onClick={() => { setIsOpen(false); setIsAuthOpen(true); }}>Log in</button>
            )}
          </div>
          
          {user && (
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 font-bold text-sm tracking-widest cursor-pointer mt-auto border-none bg-transparent"
            >
              <LogOut size={18} /> LOGOUT
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[250] md:hidden" onClick={() => setIsOpen(false)} />
      )}
    </>
  );
};

export default Navbar;