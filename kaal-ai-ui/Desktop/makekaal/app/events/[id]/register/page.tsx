"use client";

import React, { useState, Suspense } from "react";
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/navbar";

function RegisterFormContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Dynamically retrieve selected card specs from query variables
    const eventDetails = {
        title: searchParams.get("title") || "Understanding the Self: Bhagavad Gita Discussion",
        date: searchParams.get("date") || "24th Feb 2026",
        location: searchParams.get("location") || "Pune",
        time: searchParams.get("time") || "5:30 pm IST",
        pricePerTicket: parseFloat(searchParams.get("price") || "450"),
    };

    // User State Hooks matching Form Fields
    const [attendanceMode, setAttendanceMode] = useState<"Online" | "In person">("Online");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [ticketCount, setTicketCount] = useState<number>(1);

    // Reactive Total Calculations
    const totalAmount = ticketCount * eventDetails.pricePerTicket;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting registration:", {
            attendanceMode,
            fullName,
            email,
            mobileNumber,
            ticketCount,
            totalAmount,
        });
        alert(`Successfully registered for: ${eventDetails.title}`);
    };

    return (
        <div className="min-h-screen bg-[#FDF8F1] flex flex-col">
            <Navbar />
            
            {/* Centered wrapper tailored perfectly for desktop/laptop screens */}
            <main className="flex-1 flex items-center justify-center px-4 py-12 md:py-16">
                <div className="w-full max-w-2xl bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
                    
                    {/* Header Row */}
                    <div className="p-6 md:p-8 border-b border-gray-100 flex items-center gap-4">
                        <button 
                            onClick={() => router.back()} 
                            className="p-2 hover:bg-gray-50 rounded-full transition-colors cursor-pointer"
                        >
                            <ArrowLeft className="w-6 h-6 text-gray-700" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-serif font-bold text-[#2D3436]">Register</h1>
                            <p className="text-sm text-gray-500">Connect & grow together</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                        
                        {/* Event Information Box (Styled exactly from 53126.jpg) */}
                        <div className="bg-white border border-dashed border-gray-200 rounded-[24px] p-6 space-y-4">
                            <h2 className="text-xl md:text-2xl font-bold text-[#2D3436] leading-tight">
                                {eventDetails.title}
                            </h2>
                            
                            <div className="space-y-2 text-gray-500 text-sm">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-gray-400" />
                                    <span>{eventDetails.date}, {eventDetails.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={16} className="text-gray-400" />
                                    <span>{eventDetails.time}</span>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-1">
                                <span className="bg-[#EBF2FF] text-[#4A86F7] text-xs px-4 py-1 rounded-full border border-[#D0E0FF] font-medium">
                                    Online
                                </span>
                                <span className="bg-[#FFF8EC] text-[#E6BC6B] text-xs px-4 py-1 rounded-full border border-[#FFEBC2] font-medium">
                                    ₹{eventDetails.pricePerTicket}/-
                                </span>
                            </div>
                        </div>

                        {/* Attendance Mode */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 block">Attendance mode</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setAttendanceMode("Online")}
                                    className={`flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl border font-medium text-sm transition-all cursor-pointer ${
                                        attendanceMode === "Online"
                                            ? "border-[#4A86F7] bg-[#EBF2FF]/30 text-[#4A86F7]"
                                            : "border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-600"
                                    }`}
                                >
                                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                        attendanceMode === "Online" ? "border-[#4A86F7]" : "border-gray-300"
                                    }`}>
                                        {attendanceMode === "Online" && <span className="w-2 h-2 rounded-full bg-[#4A86F7]" />}
                                    </span>
                                    Online
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setAttendanceMode("In person")}
                                    className={`flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl border font-medium text-sm transition-all cursor-pointer ${
                                        attendanceMode === "In person"
                                            ? "border-[#E6BC6B] bg-[#FFF8EC]/60 text-[#d4ac5b]"
                                            : "border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-600"
                                    }`}
                                >
                                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                        attendanceMode === "In person" ? "border-[#E6BC6B]" : "border-gray-300"
                                    }`}>
                                        {attendanceMode === "In person" && <span className="w-2 h-2 rounded-full bg-[#E6BC6B]" />}
                                    </span>
                                    In person
                                </button>
                            </div>
                        </div>

                        {/* Input Fields */}
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-bold text-gray-700 block mb-1">Full name</label>
                                <input
                                    type="text"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-3.5 border border-gray-200 rounded-xl outline-none focus:border-gray-400 transition-all text-sm bg-gray-50/50"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-700 block mb-1">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your Email ID"
                                    className="w-full px-4 py-3.5 border border-gray-200 rounded-xl outline-none focus:border-gray-400 transition-all text-sm bg-gray-50/50"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-700 block mb-1">Mobile Number</label>
                                <input
                                    type="tel"
                                    required
                                    value={mobileNumber}
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                    placeholder="Enter your Mobile Number"
                                    className="w-full px-4 py-3.5 border border-gray-200 rounded-xl outline-none focus:border-gray-400 transition-all text-sm bg-gray-50/50"
                                />
                            </div>
                        </div>

                        {/* Dynamic Calculation Block */}
                        <div className="pt-4 border-t border-gray-100 space-y-4">
                            <p className="text-sm text-gray-500">
                                Ticket cost: <span className="font-bold text-gray-800">₹{eventDetails.pricePerTicket}/-</span>
                            </p>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-bold text-gray-700 block mb-1">Number of Tickets</label>
                                    <input
                                        type="number"
                                        min="1"
                                        required
                                        value={ticketCount}
                                        onChange={(e) => setTicketCount(Math.max(1, parseInt(e.target.value) || 1))}
                                        className="w-full px-4 py-3.5 border border-gray-200 rounded-xl outline-none focus:border-gray-400 text-center font-bold text-sm bg-gray-50/50"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-bold text-gray-700 block mb-1">Total (in Rupees)</label>
                                    <div className="w-full px-4 py-3.5 border border-gray-200 bg-gray-100 rounded-xl text-sm font-bold text-gray-800 text-center flex items-center justify-center h-[49px]">
                                        ₹{totalAmount}/-
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Large Laptop Action Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#E6BC6B] hover:bg-[#d4ac5b] text-white font-bold py-4 px-4 rounded-2xl transition-colors shadow-sm active:scale-[0.99] mt-6 text-center block cursor-pointer text-lg"
                        >
                            Register now
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}

// Next.js page wrapped in Suspense to resolve query string parsing successfully during builds
export default function RegisterEventPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#FDF8F1] flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-[#E6BC6B] border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <RegisterFormContent />
        </Suspense>
    );
}