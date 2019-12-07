import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <header>
        <ul className="Revendedor__opcoes">
          <li>
            <Link to="/admin/revendedor">Revendedor</Link>
          </li>
          <li>
            <Link to="/admin/cadastro">Cadastro</Link>
          </li>
          <li>
            <Link to="/admin/desenvolvedor">Desenvolvedor</Link>
          </li>
        </ul>

        <div className="Revendedor__pontuacao">
          <h3>Seus Créditos</h3>
          <h1>{this.props.credit}</h1>
        </div>
      </header>
    );
  }
}

export default Header;
