import React from "react";

export const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
export const GlobeIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.1"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
);
export const UserIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);
export const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="black" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
);
export const StarIcon = ({ percent = 100, size = 18 }) => {
  const gradientId = `star-gradient-${Math.random().toString(36).substr(2, 9)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke="#B8860B" strokeWidth="1" className="overflow-visible">
      <defs>
        <linearGradient id={gradientId}>
          <stop offset={`${percent}%`} stopColor="#FFD700" />
          <stop offset={`${percent}%`} stopColor="#E0E0E0" />
        </linearGradient>
      </defs>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill={`url(#${gradientId})`} />
    </svg>
  );
};

// Ícone de Fogo NOVO (Desenho mais limpo)
export const FireIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c0 0-6 4.5-6 9.5 0 3.59 2.686 6.5 6 6.5s6-2.91 6-6.5C18 6.5 12 2 12 2z"/>
        <path d="M12 18c-1.657 0-3-1.343-3-3 0-1.326 1.31-2.558 1.857-3.014.314-.262.88-.226 1.143.157C12.5 13.005 13 14 13 14s.5-.5.5-1.5c0 1.5 1.5 2.5 1.5 4s-1.343 1.5-3 1.5z" fill="currentColor"/>
    </svg>
);

export const PinkPinIcon = `
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="url(#pinGradient)" stroke="black" stroke-width="2"/>
    <defs>
      <linearGradient id="pinGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#FF50A8"/>
        <stop offset="100%" stop-color="#F4865E"/>
      </linearGradient>
    </defs>
    <circle cx="12" cy="10" r="3" fill="black"/>
  </svg>
`;