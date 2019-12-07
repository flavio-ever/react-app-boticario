import React, { useEffect, Component } from "react";
import { withRouter } from "react-router-dom";

import { Link } from "react-router-dom";
import moment from "moment";

class List extends Component {
  state = {
    products: null
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    const { products } = JSON.parse(localStorage.getItem(token));

    if (products) {
      this.setState({ products });
    }
  }

  removeItemList(id) {
    const token = localStorage.getItem("token");
    const products = this.state.products.filter((_, key) => {
      return key !== id;
    });

    this.setState({ products });

    localStorage.setItem(
      token,
      JSON.stringify({ ...JSON.parse(localStorage.getItem(token)), products })
    );
  }

  render() {
    let status = [
      { class: "validacao", title: "Validação" },
      { class: "aprovado", title: "Aprovado" },
      { class: "reprovado", title: "Reprovado" }
    ];
    const token = localStorage.getItem("token");
    const { nomecompl } = JSON.parse(localStorage.getItem(token));
    return (
      <>
        {!this.state.products ? (
          <div>
            <h3>Seja bem vindo(a) {nomecompl}.</h3>
            <h3>Nenhum produto cadastrado!</h3>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Valor</th>
                <th>Data</th>
                <th>Cash Aplicado</th>
                <th>Valor do Cash</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {this.state.products.map((product, index) => (
                <tr key={index}>
                  <td>{product.codProduct}</td>
                  <td>{product.valueProduct.inputValue.mask}</td>
                  <td>{moment(product.dateProduct).format("DD/MM/YYYY")}</td>
                  <td>{product.valueProduct.rPorcent}%</td>
                  <td>{product.valueProduct.rCash.mask}</td>
                  <td>
                    <span
                      className={`status ${status[product.statusCash].class}`}
                    >
                      {status[product.statusCash].title}
                    </span>
                  </td>
                  {product.statusCash === 0 && (
                    <td>
                      <Link className="editar" to={`cadastro/${index}`}>
                        Editar
                      </Link>
                      <a
                        className="remover"
                        onClick={() => this.removeItemList(index)}
                      >
                        Remover
                      </a>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    );
  }
}

export default withRouter(List);
