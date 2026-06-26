"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { Calendar, Clock, MapPin } from "lucide-react";
import Navbar from "@/components/navbar";

function PaymentSummaryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { id } = useParams();

  // Extract dynamic form queries sent from registration
  const attendee = searchParams.get("name") || "Guest User";
  const tickets = searchParams.get("tickets") || "1";
  const price = searchParams.get("price") || "450";
  const subtotal = searchParams.get("total") || "450";
  
  const platformFee = 50;
  const finalTotal = parseInt(subtotal, 10) + platformFee;

  return (
    <div className="min-h-screen w-full bg-[#FDF8F1] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:py-8">
          
          {/* LEFT SIDE: Event Typography Info Column */}
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left mt-4 lg:mt-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#2D3436] leading-tight">
              Understanding the Self: Bhagavad Gita Discussion
            </h1>
            
            <div className="text-gray-500 space-y-3 text-base md:text-lg inline-block lg:block text-left">
              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-[#E6BC6B]" />
                <span>24th Feb 2026</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-[#E6BC6B]" />
                <span>05:30 PM IST</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-[#E6BC6B]" />
                <span>Pune</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Interactive Invoice Summary Card */}
          <div className="w-full lg:max-w-lg bg-white p-8 md:p-10 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-dashed border-gray-200">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[#2D3436]">Payment summary</h2>
              <p className="text-sm text-gray-400 mt-1">Review the booking details</p>
            </div>

            {/* Price Line Breakdown */}
            <div className="space-y-5 mb-8">
              <div className="flex justify-between items-center text-base md:text-lg">
                <span className="text-gray-400 font-medium">Attendee:</span>
                <span className="font-bold text-[#2D3436]">{attendee}</span>
              </div>
              
              <div className="flex justify-between items-center text-base md:text-lg">
                <span className="text-gray-400 font-medium">Tickets:</span>
                <span className="font-bold text-[#2D3436]">
                  {tickets} × ₹{price}
                </span>
              </div>
              
              <div className="flex justify-between items-center text-base md:text-lg">
                <span className="text-gray-400 font-medium">Subtotal:</span>
                <span className="font-bold text-[#2D3436]">₹{subtotal}</span>
              </div>
              
              <div className="flex justify-between items-center text-base md:text-lg">
                <span className="text-gray-400 font-medium">Platform fee:</span>
                <span className="font-bold text-[#2D3436]">₹{platformFee}</span>
              </div>
              
              <hr className="border-dashed border-gray-200" />
              
              <div className="flex justify-between items-center text-lg md:text-xl font-black pt-2">
                <span className="text-[#2D3436]">Total Amount:</span>
                <span className="text-[#E6BC6B] text-xl md:text-2xl">₹{finalTotal}/-</span>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                type="button"
                onClick={() => router.back()}
                className="flex-1 py-3.5 border-2 border-[#EFB067] text-[#EFB067] font-bold rounded-2xl hover:bg-[#FFF8EC] transition-all text-xs md:text-sm cursor-pointer text-center"
              >
                Back to booking
              </button>

              <button 
                type="button"
                onClick={() => alert("Initiating Payment Flow...")}
                className="flex-1 py-3.5 bg-[#E9B96E] hover:bg-[#d4ac5b] text-white font-bold rounded-2xl shadow-md shadow-amber-100 transition-all text-xs md:text-sm border-none outline-none cursor-pointer text-center"
              >
                Proceed for payment
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default function PaymentSummaryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FDF8F1] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#E6BC6B] border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <PaymentSummaryContent />
    </Suspense>
  );
}