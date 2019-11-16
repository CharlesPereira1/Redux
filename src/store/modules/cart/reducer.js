export default function cart(state = [], action) {
  console.log(state);

  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.product];
    default:
      return state;
  }
}
/**
 * todos os reducers houvem todas as actions. Neste caso foi criado um para ouvir
 * apenas as actions produtos. Foi criado o case para houvir as actions que agente quer
 * inicia o estado ("state = []") com array vazio, recebe a action, pega o produto
 * e coloca dentra do array dentro com as demais, no começo nao tem info
 * o redux avisa todos os componentes que a informaçao foi atualizada e os mesmos são atualizados
 */
