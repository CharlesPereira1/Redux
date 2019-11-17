import React, { Component } from 'react';
import { MdShoppingCart } from 'react-icons/md';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { formatPrice } from '../../util/format';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';

class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('products');

    const data = response.data.map(product => ({
      ...product, // copia todos os dados do produto
      priceFormatted: formatPrice(product.price), // aplica funcao de formataçaoa de datas
    }));

    this.setState({ products: data }); // passa a variavel que criou
  }

  handAddProduct = product => {
    // dispatch serve para disparar action ao redux
    // as actions diz ao reduz que quero fazer alteraçao ao estado
    // adicionar, remover, modificar
    const { addToCart } = this.props;

    // toda app tem q ter um TYPE
    addToCart(product);
  };

  render() {
    const { products } = this.state;

    return (
      <ProductList>
        {products.map(product => (
          <li key={products.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>

            <button type="button" onClick={() => this.handAddProduct(product)}>
              <div>
                <MdShoppingCart size={16} color="#FFF" /> 3
              </div>

              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(null, mapDispatchToProps)(Home);
// p/ redux trazer o export para baixo e chamar o connect() vazio em seguida
// o component (Home)
