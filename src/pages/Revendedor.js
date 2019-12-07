import React, { Component } from "react";

import logoBoticario from "../assets/logoBoticario.svg";
import api from "../../services/api";

import List from "../components/List";
import Header from "../components/Header";
import Cadastro from "../components/Cadastro";
import Desenvolvedor from "../components/Desenvolvedor";

export default class Revendedor extends Component {
  state = {
    credit: 0
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    const { cpf } = JSON.parse(localStorage.getItem(token));

    api.get(`?cpf=${cpf}`).then(res => {
      const { credit } = res.data.body;
      this.setState({ credit });
    });
    // Sessão
    // !(this.props.location.state) && this.props.history.push('/');
  }

  render() {
    let { edit, children } = this.props.match.params;

    return (
      <div className="Revendedor">
        <img
          className="Revendedor_logotipo"
          src={logoBoticario}
          alt="Boticario Logotipo"
        />
        <Header credit={this.state.credit} />
        <div className="Revendedor__content">
          {children === "revendedor" && <List />}
          {children === "cadastro" && <Cadastro idProduct={edit} />}
          {children === "desenvolvedor" && <Desenvolvedor />}
        </div>
      </div>
    );
  }
}
