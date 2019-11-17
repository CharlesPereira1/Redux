import { call, put, all, takeLatest } from 'redux-saga/effects';

import api from '../../../services/api';

import { addToCartSuccess } from './actions';

// generation async. O generation é mais potente que o async
// yield substitui o wait
function* addToCart({ id }) {
  const response = yield call(api.get, `/products/${id}`);

  yield put(addToCartSuccess(response.data));
}

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
