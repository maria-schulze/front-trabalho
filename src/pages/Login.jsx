import React, { useState } from "react";
import { signIn } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Logo } from "../components"; 

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

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-4">
      <Logo />
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <div className="mb-4 relative">
          <input
            className="w-full p-3 text-base text-white font-bold placeholder-white bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000] focus:outline-none focus:ring-2 focus:ring-pink-300"
            placeholder="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6 relative">
          <input
            className="w-full p-3 text-base text-white font-bold placeholder-white bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000] focus:outline-none focus:ring-2 focus:ring-pink-300"
            placeholder="Senha"
            type="password"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        {erro && <p className="text-red-500 text-center mb-4">{erro}</p>}
        <button type="submit" className="w-full p-2.5 mb-3 text-base text-white font-bold bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
          Entrar
        </button>
        <Link to="/register" className="w-full block p-2.5 text-base text-white font-bold bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all text-center">
          Cadastrar-se
        </Link>
      </form>
    </div>
  );
}
