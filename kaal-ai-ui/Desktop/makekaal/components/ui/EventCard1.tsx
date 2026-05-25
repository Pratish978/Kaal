"use client";
import { Calendar, Clock, MapPin, Video } from "lucide-react";

interface Event {
  title: string;
  date: string;
  time: string;
  type: string;
  location?: string;
  description: string;
}

export default function EventCard({ event }: { event: Event }) {
  return (
    <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full max-w-sm">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-xl font-bold text-gray-800 leading-tight pr-4">
          {event.title}
        </h3>
        <div className="flex flex-col gap-2 items-end">
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            event.type === 'online' ? 'bg-blue-50 text-blue-500' : 'bg-green-50 text-green-500'
          }`}>
            {event.type}
          </span>
          <span className="px-3 py-1 bg-orange-50 text-[#E9B87D] rounded-full text-[10px] font-bold">
            ₹0
          </span>
        </div>
      </div>

      <div className="space-y-4 mb-8 flex-1">
        <div className="flex items-center gap-3 text-gray-500 text-sm">
          <Calendar className="w-4 h-4" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-500 text-sm">
          <Clock className="w-4 h-4" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-500 text-sm">
          {event.type === 'online' ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
          <span>{event.location || "Zoom Meeting"}</span>
        </div>
      </div>

      <button className="w-full bg-[#E9B87D] hover:bg-[#d8a56a] text-white font-bold py-4 rounded-2xl transition-colors text-sm">
        Register now
      </button>
    </div>
  );
}