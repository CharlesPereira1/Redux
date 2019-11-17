import produce from 'immer';

export default function cart(state = [], action) {
  switch (action.type) {
    case '@cart/ADD_SUCCESS':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.product.id);

        if (productIndex >= 0) {
          draft[productIndex].amount += 1;
        } else {
          draft.push({
            ...action.product,
            amount: 1,
          });
        }
      });

    case '@cart/REMOVE':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);

        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });

    case '@cart/UPDATE_AMOUNT': {
      if (action.amount <= 0) {
        return state;
      }

      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);

        if (productIndex >= 0) {
          draft[productIndex].amount = Number(action.amount);
        }
      });
    }
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
