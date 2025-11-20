import React from "react";
import { StarIcon } from "../components/Icons";

export function Profile() {
  const myReviews = [
    { id: 101, placeName: "Soho", rating: 4.2, text: "O lugar é incrível! Valeu a pena.", image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=600&q=80" },
    { id: 102, placeName: "Moon Club", rating: 5.0, text: "Sem palavras para essa noite.", image: "https://images.unsplash.com/photo-1570872626485-d8ffea69f463?auto=format&fit=crop&w=600&q=80" }
  ];
  const editBtnGradient = { background: "linear-gradient(90deg, #FF50A8 0%, #F4865E 100%)" };
  const renderStars = (rating) => [...Array(5)].map((_, index) => (<div key={index} className="mr-0.5"><StarIcon percent={Math.max(0, Math.min(1, rating - index)) * 100} size={16} /></div>));

  return (
    <div className="w-full bg-white flex flex-col font-['Poppins'] min-h-full">
      <div className="h-24 bg-white w-full shrink-0"></div>
      <div className="flex-1 bg-[#FFE5E5] rounded-t-[40px] relative px-6 pt-1 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-32 h-32 rounded-full p-[4px] bg-gradient-to-tr from-blue-600 to-cyan-400 shadow-xl">
             <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80" alt="Profile" className="w-full h-full rounded-full object-cover border-[4px] border-[#FFE5E5]" />
          </div>
        </div>
        <div className="flex justify-between items-center px-6 mt-4 mb-2">
            <div className="flex flex-col items-center"><span className="font-black text-xl text-[#2D1F43]">102</span><span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Sorrisos</span></div>
            <div className="w-24"></div>
            <div className="flex flex-col items-center"><span className="font-black text-xl text-[#2D1F43]">46</span><span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Amigos</span></div>
        </div>
        <div className="flex flex-col items-center gap-3 mb-8">
            <h2 className="font-black text-2xl text-[#2D1F43]">@enner</h2>
            <button className="px-8 py-1.5 rounded-full text-white font-bold text-xs shadow-lg hover:shadow-xl hover:scale-105 transition-all" style={editBtnGradient}>Editar Perfil</button>
        </div>
        <div className="w-full flex flex-col gap-6 pb-6">
           <h3 className="text-[#2D1F43] font-bold text-lg ml-1 border-l-4 border-[#F4865E] pl-3">Minhas Avaliações</h3>
           {myReviews.map(review => (
               <div key={review.id} className="bg-white rounded-[25px] p-4 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-3">
                      <span className="px-4 py-1 rounded-full text-white font-bold text-sm shadow-md" style={{ background: "#F4865E" }}>{review.placeName}</span>
                      <div className="flex items-center bg-gray-50 px-2 py-1 rounded-lg">{renderStars(review.rating)}<span className="ml-1 text-xs font-bold text-gray-600">{review.rating}</span></div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3 italic border-l-2 border-gray-200 pl-3">"{review.text}"</p>
                  <div className="w-full h-40 rounded-xl overflow-hidden relative group shadow-inner">
                      <img src={review.image} alt={review.placeName} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors pointer-events-none"></div>
                  </div>
               </div>
           ))}
        </div>
      </div>
    </div>
  );
}