import React, { useState } from "react";
import { signIn } from "../services/authService"; //
import { Link, useNavigate } from "react-router-dom"; //
import { useAuth } from "../contexts/AuthContext"; //

// Ícone do Google (SVG) para o botão
const GoogleIcon = () => (
  <svg className="w-6 h-6 mr-3" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.18 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.42-4.55H24v8.51h12.8c-.54 2.77-2.07 5.12-4.3 6.7l7.98 6.19C42.6 37.83 46.98 31.76 46.98 24.55z"></path>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.98-6.19c-2.11 1.45-4.81 2.3-7.91 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
    <path fill="none" d="M0 0h48v48H0z"></path>
  </svg>
);

// Componente de Logo (baseado na imagem)
const Logo = () => (
  <div className="w-32 h-32 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-xl mb-10">
    <span className="text-6xl" role="img" aria-label="logo">
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
      // Lógica de login mantida do seu arquivo original
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

      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="pb-4">
          <input
            className="w-full p-4 text-lg text-white font-bold placeholder-white bg-gradient-to-r from-pink-500 to-orange-400 rounded-full shadow-md border-2 border-black focus:outline-none focus:ring-2 focus:ring-pink-300"
            placeholder="Email" // O serviço espera email, não "Usuário"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="pb-6">
          <input
            className="w-full p-4 text-lg text-white font-bold placeholder-white bg-gradient-to-r from-pink-500 to-orange-400 rounded-full shadow-md border-2 border-black focus:outline-none focus:ring-2 focus:ring-pink-300"
            placeholder="Senha"
            type="password"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        {erro && <p className="text-red-500 text-center pb-4">{erro}</p>}

        {/* Botão Google (Visual, sem lógica no seu authService.js) */}
        <button
          type="button"
          className="w-full p-3 mb-4 text-lg font-semibold text-gray-700 bg-white rounded-full shadow-md border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50"
        >
          <GoogleIcon />
          Fazer login com Google
        </button>

        {/* Botão Entrar */}
        <button
          type="submit"
          className="w-full p-4 mb-4 text-lg text-white font-bold bg-gradient-to-r from-pink-500 to-orange-400 rounded-full shadow-md border-2 border-black hover:opacity-90"
        >
          Entrar
        </button>

        {/* Botão Voltar (Link para Registro) */}
        <Link
          to="/register"
          className="w-full block p-3 text-lg text-white font-bold bg-gradient-to-r from-pink-500 to-orange-400 rounded-full shadow-md border-2 border-black text-center hover:opacity-90"
        >
          Voltar
        </Link>
      </form>
    </div>
  );
}
