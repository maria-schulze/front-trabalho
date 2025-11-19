import React, { useState } from "react";
import { signIn } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LogoImage = () => (
  <div className="w-32 h-32 mb-8 flex items-center justify-center">
    <img src="/logo.PNG" alt="Party Map Logo" className="w-full h-full object-contain drop-shadow-lg" />
  </div>
);

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
      <LogoImage />

      <form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col items-center">
        <div className="mb-4 relative w-full">
          <input
            className="w-full p-3 text-base text-white font-bold placeholder-white bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000] focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-100 ease-in-out"
            placeholder="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6 relative w-full">
          <input
            className="w-full p-3 text-base text-white font-bold placeholder-white bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000] focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-100 ease-in-out"
            placeholder="Senha"
            type="password"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        {erro && <p className="text-red-500 text-center mb-4 font-bold border-2 border-red-500 p-2 rounded bg-red-100 w-full">{erro}</p>}

        {/* Botões Lado a Lado: Criar Conta (Esq) | Entrar (Dir) */}
        <div className="flex w-full justify-between gap-3">
            <Link
            to="/register"
            className="flex-1 block py-2 px-1 text-sm text-white font-bold bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-100 ease-in-out text-center"
            >
            Criar conta
            </Link>

            <button
            type="submit"
            className="flex-1 py-2 px-1 text-sm text-white font-bold bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-100 ease-in-out"
            >
            Entrar
            </button>
        </div>
      </form>
    </div>
  );
}
