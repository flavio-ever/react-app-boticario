import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoBoticario from "../assets/logoBoticario.svg";

export default function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msgLogin, setMsgLogin] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const revenLocal = localStorage[email];

    if (revenLocal) {
      const { password: pwLocal } = JSON.parse(revenLocal);
      if (password === pwLocal) {
        localStorage.setItem("token", email);
        history.push("admin/revendedor");
      } else {
        setMsgLogin("Senha inválida!");
      }
    } else {
      setMsgLogin("E-mail inválido!");
    }
  }

  return (
    <div className="Login">
      <img id="logoTipo" src={logoBoticario} alt="Boticario Logotipo" />
      <div className="Login__content">
        <form action="" method="post" onSubmit={handleSubmit}>
          <p className="Login__saudacao">Olá, Revendedor(a)</p>

          <label className="Login__saudacao" htmlFor="email">
            E-mail:
          </label>

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
          {msgLogin && <p style={{ color: "red" }}>{msgLogin}</p>}
          <p>
            Ainda não possui uma conta? <Link to="signin">Registre-se</Link>
          </p>
          <button className="Login__btn">Entrar</button>
        </form>
      </div>
    </div>
  );
}
