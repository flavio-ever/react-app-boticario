import React, { useState } from "react";
import InputMask from "react-input-mask";
import logoBoticario from "../assets/logoBoticario.svg";

export default function SignIn({ history }) {
  const [nomecompl, setNomeCompl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCPF] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    localStorage.setItem(
      [email],
      JSON.stringify({ nomecompl, password, cpf: cpf.replace(/\D+/g, "") })
    );

    history.push("/");
  }

  return (
    <div className="Login">
      <img id="logoTipo" src={logoBoticario} alt="Boticario Logotipo" />
      <div className="Login__content">
        <p className="Login__saudacao">Cadastro</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Nome completo: </label>
          <input
            type="text"
            name="nomecompl"
            id="nomecompl"
            placeholder="Seu nome completo"
            required
            value={nomecompl}
            onChange={event => setNomeCompl(event.target.value)}
          />

          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Seu e-mail"
            required
            value={email}
            onChange={event => setEmail(event.target.value)}
          />

          <label htmlFor="password">Senha: </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Sua senha"
            required
            value={password}
            onChange={event => setPassword(event.target.value)}
          />

          <label htmlFor="cpf">Senha: </label>

          <InputMask
            mask="999.999.999-99"
            placeholder="000.000.000-00"
            value={cpf}
            required
            onChange={event => setCPF(event.target.value)}
          ></InputMask>

          <button className="Login__btn">Registrar-se</button>
        </form>
      </div>
    </div>
  );
}
