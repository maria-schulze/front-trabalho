import React, { useState } from "react";
import { signIn } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.18 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.42-4.55H24v8.51h12.8c-.54 2.77-2.07 5.12-4.3 6.7l7.98 6.19C42.6 37.83 46.98 31.76 46.98 24.55z"></path>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.98-6.19c-2.11 1.45-4.81 2.3-7.91 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
    <path fill="none" d="M0 0h48v48H0z"></path>
  </svg>
);

const Logo = () => (
  <div className="w-24 h-24 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg mb-8 border-2 border-black">
    <span className="text-5xl" role="img" aria-label="logo">
      🎉
    </span>
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
      const token = await signIn(email, senha);
      login(token);
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
            className="w-full p-3 text-base text-white font-bold placeholder-white bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000] focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-100 ease-in-out"
            placeholder="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6 relative">
          <input
            className="w-full p-3 text-base text-white font-bold placeholder-white bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000] focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-100 ease-in-out"
            placeholder="Senha"
            type="password"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        {erro && <p className="text-red-500 text-center mb-4">{erro}</p>}

        <button
          type="button"
          className="w-full p-2 mb-4 text-base font-semibold text-gray-700 bg-white rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000] flex items-center justify-center hover:bg-gray-50 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-100 ease-in-out"
        >
          <GoogleIcon />
          Fazer login com Google
        </button>

        <button
          type="submit"
          className="w-full p-2.5 mb-3 text-base text-white font-bold bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-100 ease-in-out"
        >
          Entrar
        </button>

        <Link
          to="/register"
          className="w-full block p-2.5 text-base text-white font-bold bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-100 ease-in-out text-center"
        >
          Voltar
        </Link>
      </form>
    </div>
  );
}
