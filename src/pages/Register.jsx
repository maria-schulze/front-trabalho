import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../services/authService";

// Reutilizamos o componente de Logo (ou podemos importar se você refatorar depois)
const LogoImage = () => (
  <div className="w-32 h-32 mb-8 flex items-center justify-center">
    <img src="/logo.PNG" alt="Party Map Logo" className="w-full h-full object-contain drop-shadow-lg" />
  </div>
);

export function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");
        try {
            await signUp(name, email, senha);
            alert("Cadastro realizado com sucesso!");
            navigate("/login");
        } catch (err) {
            setErro(err.message);
        }
    };

    return (
        <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-4">
            <LogoImage />
            
            <h2 className="text-2xl font-black mb-6 text-black uppercase tracking-wider">
                Crie sua Conta
            </h2>

            <form onSubmit={handleSubmit} className="w-full max-w-xs">
                {/* Campo Nome */}
                <div className="mb-4 relative">
                    <input
                        className="w-full p-3 text-base text-white font-bold placeholder-white bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000] focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-100 ease-in-out"
                        placeholder="Nome"
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                {/* Campo Email */}
                <div className="mb-4 relative">
                    <input
                        className="w-full p-3 text-base text-white font-bold placeholder-white bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000] focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-100 ease-in-out"
                        placeholder="Email"
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                {/* Campo Senha */}
                <div className="mb-6 relative">
                    <input
                        className="w-full p-3 text-base text-white font-bold placeholder-white bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000] focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-100 ease-in-out"
                        placeholder="Senha"
                        type="password"
                        required
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />
                </div>

                {erro && <p className="text-red-500 text-center mb-4 font-bold border-2 border-red-500 p-2 rounded bg-red-100">{erro}</p>}

                {/* Botão Cadastrar */}
                <button 
                    type="submit"
                    className="w-full p-2.5 mb-3 text-base text-white font-bold bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-100 ease-in-out"
                >
                    Cadastrar
                </button>

                {/* Botão Voltar para Login */}
                <Link 
                    to="/login" 
                    className="w-full block p-2.5 text-base text-white font-bold bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-100 ease-in-out text-center"
                >
                    Já tenho conta
                </Link>
            </form>
        </div>
    );
}
