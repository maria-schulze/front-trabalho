import React, { useEffect, useState } from "react";

export function LoadingScreen({ onComplete }) {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsFading(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isFading) {
      const cleanup = setTimeout(onComplete, 700);
      return () => clearTimeout(cleanup);
    }
  }, [isFading, onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-700 ease-in-out ${isFading ? "opacity-0" : "opacity-100"}`}>
      <div className="w-48 h-48 md:w-64 md:h-64 animate-bounce-slow">
        <img src="/logo.PNG" alt="PartyMap Logo" className="w-full h-full object-contain drop-shadow-xl" />
      </div>
    </div>
  );
}