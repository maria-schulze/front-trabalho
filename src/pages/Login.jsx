import React, { useState } from "react";
import { signIn } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    try {
      const userData = await signIn(email, senha);
      login(userData);
      navigate("/map");
    } catch (err) {
      setErro(err.message);
    }
  };

  const inputStyle = "w-full py-3 px-6 rounded-full border-[3px] border-black text-white font-bold placeholder-white/90 outline-none text-lg shadow-md";
  const gradientBg = { background: "linear-gradient(90deg, #FF50A8 0%, #F4865E 100%)" };

  return (
    <div className="min-h-full w-full bg-white flex flex-col items-center justify-center p-4 font-['Poppins']">
      <div className="w-32 h-32 md:w-40 md:h-40 mb-8 animate-bounce-slow">
        <img src="/logo.PNG" alt="Logo" className="w-full h-full object-contain drop-shadow-lg" />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm items-center">
        <input className={inputStyle} style={gradientBg} placeholder="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className={inputStyle} style={gradientBg} placeholder="Senha" type="password" required value={senha} onChange={(e) => setSenha(e.target.value)} />
        {erro && <div className="w-full text-center text-red-500 font-bold bg-red-100 border-2 border-red-500 rounded-lg p-2 mt-2">{erro}</div>}
        <div className="flex flex-col gap-3 w-full items-center mt-6">
            <button type="submit" className="w-48 py-3 rounded-full border-[3px] border-black text-white font-bold text-xl shadow-md hover:scale-105 transition-transform" style={gradientBg}>Entrar</button>
            <Link to="/" className="w-32 py-2 text-center rounded-full border-[3px] border-black text-white font-bold shadow-md hover:scale-105 transition-transform" style={gradientBg}>Voltar</Link>
        </div>
      </form>
    </div>
  );
}