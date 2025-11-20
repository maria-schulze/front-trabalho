import React, { useState } from "react";
import { StarIcon, UserIcon } from "../components/Icons";

const FEED_POSTS = [
  {
    id: 1, user: "Ana Souza", place: "Moon Club", rating: 4, likes: 472,
    image: "https://images.unsplash.com/photo-1570872626485-d8ffea69f463?auto=format&fit=crop&w=500&q=80",
    text: "Festa incrível! Ambiente animado, música ótima e muita gente legal. Recomendo demais para quem quer curtir a noite!",
  },
  {
    id: 2, user: "Carlos Lima", place: "Beehive", rating: 5, likes: 320,
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=500&q=80",
    text: "A melhor iluminação da cidade. Bebidas com preço justo e DJ sensacional.",
  },
  {
    id: 3, user: "Mariana Luz", place: "Rooftop 360", rating: 5, likes: 150,
    image: "https://images.unsplash.com/photo-1514525253440-b393452e3720?auto=format&fit=crop&w=500&q=80",
    text: "Vista maravilhosa e drinks perfeitos. O pôr do sol aqui é obrigatório!",
  }
];

export function Feed() {
  const [activeTab, setActiveTab] = useState("paravoce");
  const gradientBg = { background: "linear-gradient(90deg, #FF50A8 0%, #F4865E 100%)" };

  return (
    <div className="w-full bg-[#FFE5E5] flex flex-col font-['Poppins'] min-h-full">
      <div className="flex justify-center items-center gap-4 pt-8 pb-4 bg-[#FFE5E5] sticky top-0 z-10">
        <button onClick={() => setActiveTab("paravoce")} className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 border-[2px] ${activeTab === "paravoce" ? "border-black text-white shadow-md transform scale-105" : "border-transparent text-gray-500 bg-white/50"}`} style={activeTab === "paravoce" ? gradientBg : {}}>Para Você</button>
        <button onClick={() => setActiveTab("seguindo")} className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 border-[2px] ${activeTab === "seguindo" ? "border-black text-white shadow-md transform scale-105" : "border-transparent text-gray-500 bg-white/50"}`} style={activeTab === "seguindo" ? gradientBg : {}}>Seguindo</button>
      </div>
      <div className="flex flex-col gap-6 px-4 pb-4">
        {FEED_POSTS.map((post) => (
          <div key={post.id} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden border border-black"><UserIcon /></div>
                <div className="flex flex-col">
                    <span className="font-bold text-sm">{post.user}</span>
                    <div className="flex">{[...Array(5)].map((_, i) => (<div key={i} className="scale-75"><StarIcon percent={i < post.rating ? 100 : 0} size={12} /></div>))}</div>
                </div>
              </div>
              <h3 className="font-black text-xl">{post.place}</h3>
            </div>
            <div className="relative w-full h-64 rounded-2xl overflow-hidden border-2 border-black shadow-sm">
                <img src={post.image} alt={post.place} className="w-full h-full object-cover" />
            </div>
            <div className="bg-white/60 p-3 rounded-xl border border-black/5"><p className="text-sm text-gray-800 font-medium leading-snug">{post.text}</p></div>
            <div className="w-full h-[1px] bg-black/10 mt-2"></div>
          </div>
        ))}
        <div className="p-4 text-gray-400 text-xs text-center">Você chegou ao fim do feed por hoje! 🎉</div>
      </div>
    </div>
  );
}