import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import CurrencyInput from "react-currency-input";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

class Cadastro extends Component {
  state = {
    codProduct: "",
    dateProduct: new Date(),
    valueProduct: {
      inputValue: { mask: 1, value: 1 },
      rPorcent: 0,
      rCash: { mask: 1, value: 1 }
    },
    statusCash: 1
  };

  componentDidMount() {
    // Edição de Produto
    const token = localStorage.getItem("token");
    const revendedor = JSON.parse(localStorage.getItem(token));
    const product = revendedor.products;
    const { idProduct } = this.props;

    if (typeof product !== "undefined" && idProduct) {
      const { codProduct, dateProduct, valueProduct } = product[
        Number(idProduct)
      ];

      this.setState({
        codProduct,
        valueProduct,
        dateProduct: moment(dateProduct).toDate()
      });
    }
  }

  handleChangeCod = e => {
    this.setState({
      codProduct: e.target.value
    });
  };

  handleChangeDate = date => {
    this.setState({
      dateProduct: date
    });
  };

  handleChangeValue = (event, mValue, fValue) => {
    const rPorcent = Math.floor(Math.random() * 100 + 1);
    const vCash = fValue * (rPorcent / 100);
    const mCash = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(vCash);

    this.setState({
      valueProduct: {
        inputValue: { mask: mValue, value: fValue },
        rPorcent,
        rCash: { mask: mCash, value: vCash }
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.history.push("/admin/revendedor");

    const token = localStorage.getItem("token");
    const revendedor = JSON.parse(localStorage.getItem(token));
    let { codProduct, dateProduct, valueProduct } = this.state;
    let statusCash = Math.floor(Math.random() * 2); // 0 a 2

    // Novo Produto
    if (!this.props.idProduct) {
      localStorage.setItem(
        token,
        JSON.stringify({
          ...revendedor,
          products: revendedor.products
            ? [
                ...revendedor.products,
                { codProduct, dateProduct, valueProduct, statusCash }
              ]
            : [{ codProduct, dateProduct, valueProduct, statusCash }]
        })
      );
      return false;
    }

    // Edição do Produto
    let products = revendedor.products.map((product, key) => {
      if (key === Number(this.props.idProduct)) {
        product = {
          codProduct,
          dateProduct,
          valueProduct,
          statusCash: product.statusCash
        };
      }
      return product;
    });

    localStorage.setItem(
      token,
      JSON.stringify({
        ...revendedor,
        products
      })
    );
  };

  render() {
    return (
      <div className="Cadastro">
        <form action="" method="post" onSubmit={this.handleSubmit}>
          <div className="Cadastro__inputs">
            <div className="Cadastro__wrap">
              <label className="" htmlFor="email">
                Código do Produto:
              </label>
              <input
                value={this.state.codProduct}
                onChange={this.handleChangeCod}
                maxLength="8"
                type="text"
                name="text"
                placeholder="ABC0101"
                required
              />
            </div>

            <div className="Cadastro__wrap">
              <label className="" htmlFor="email">
                Valor:
              </label>

              <CurrencyInput
                required
                decimalSeparator=","
                thousandSeparator="."
                prefix="R$"
                value={this.state.valueProduct.inputValue.mask}
                onChangeEvent={this.handleChangeValue}
              />
            </div>

            <div className="Cadastro__wrap">
              <label className="" htmlFor="email">
                Data:
              </label>
              <DatePicker
                selected={this.state.dateProduct}
                onChange={this.handleChangeDate}
                locale="pt-BR"
                dateFormat="dd/MM/yyyy"
                required
              />
            </div>
          </div>
          <div className="Cadastro__submit">
            <button type="submit" className="Cadastro__btn">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Cadastro);
