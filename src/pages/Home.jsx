import React from "react";
import { Link } from "react-router-dom";

export function Home() {
  const gradientBg = { background: "linear-gradient(90deg, #FF50A8 0%, #F4865E 100%)" };
  return (
    <div className="min-h-full w-full bg-white flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-6 animate-fade-in-up">
        <div className="flex flex-col items-center">
          <div className="w-48 h-48 md:w-64 md:h-64 mb-2">
             <img src="/logo.PNG" alt="PartyMap Logo" className="w-full h-full object-contain drop-shadow-lg" />
          </div>
          <h1 className="text-[#433660] text-5xl md:text-6xl font-bold font-['Poppins'] tracking-tight mb-10">PartyMap</h1>
        </div>
        <div className="flex flex-col gap-5 w-full items-center">
          <Link to="/login" className="w-64 md:w-80 py-3 text-center text-white text-xl font-bold rounded-full border-[3px] border-black shadow-md hover:scale-105 transition-transform" style={gradientBg}>Login</Link>
          <Link to="/register" className="w-64 md:w-80 py-3 text-center text-white text-xl font-bold rounded-full border-[3px] border-black shadow-md hover:scale-105 transition-transform" style={gradientBg}>Criar Conta</Link>
        </div>
      </div>
    </div>
  );
}