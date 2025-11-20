import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../services/authService";

export function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmSenha, setConfirmSenha] = useState("");
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    const inputStyle = "w-full py-3 px-6 rounded-full border-[3px] border-black text-white font-bold placeholder-white/90 outline-none text-lg shadow-md";
    const gradientBg = { background: "linear-gradient(90deg, #FF50A8 0%, #F4865E 100%)" };
    const greenButtonStyle = "flex-1 py-3 rounded-full border-[3px] border-black bg-[#8BD0B4] text-white font-bold text-lg shadow-md hover:bg-[#7acea8] hover:scale-105 transition-all text-center uppercase tracking-wide";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");
        if (senha !== confirmSenha) { setErro("As senhas não coincidem."); return; }
        try {
            await signUp(name, email, senha);
            alert("Cadastro realizado com sucesso!");
            navigate("/login");
        } catch (err) { setErro(err.message); }
    };

    return (
        <div className="min-h-full w-full bg-white flex flex-col items-center justify-center p-4 font-['Poppins']">
            <div className="w-24 h-24 md:w-32 md:h-32 mb-6 animate-bounce-slow">
                <img src="/logo.PNG" alt="Logo" className="w-full h-full object-contain drop-shadow-lg" />
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm items-center">
                <input className={inputStyle} style={gradientBg} placeholder="Nome" type="text" required value={name} onChange={e => setName(e.target.value)} />
                <input className={inputStyle} style={gradientBg} placeholder="Email" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
                <input className={inputStyle} style={gradientBg} placeholder="Senha" type="password" required value={senha} onChange={e => setSenha(e.target.value)} />
                <input className={inputStyle} style={gradientBg} placeholder="Confirmar senha" type="password" required value={confirmSenha} onChange={e => setConfirmSenha(e.target.value)} />
                {erro && <div className="w-full text-center text-red-500 font-bold bg-red-100 border-2 border-red-500 rounded-lg p-2">{erro}</div>}
                <div className="flex w-full justify-between gap-4 mt-6">
                    <button type="submit" className={greenButtonStyle}>Criar Conta</button>
                    <Link to="/" className={greenButtonStyle}>Sair</Link>
                </div>
            </form>
        </div>
    );
}