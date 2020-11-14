import {handleActions} from 'redux-actions';
import {removeCreditCardAction, setAccountAction, setCreditCardAction} from './actions';
import IActionState from './state';

export default handleActions<IActionState, any>(
  {
    [setAccountAction.toString()]: (state, {payload}) => ({
      ...state,
      id: payload.id,
      email: payload.email,
      first_name: payload.first_name,
      last_name: payload.last_name,
      avatar: payload.avatar,
      date_of_birth: payload.date_of_birth,
      weight: payload.weight,
      height: payload.height,
      gender: payload.gender,
      creditCard: payload.credit_card,
      has_friend: payload.has_friend,
      fcm_token: payload.fcm_token,
      hasPaymentFailed: payload.hasPaymentFailed,
    }),
    [setCreditCardAction.toString()]: (state, {payload}) => {
      const listCard = state.creditCard;
      listCard.push({
        card_id: payload.card_id,
        four_digit_card: payload.four_digit_card,
      });
      return {
        ...state,
        creditCard: listCard,
      };
    },
    [removeCreditCardAction.toString()]: (state, {payload}) => {
      const listCard = state.creditCard;
      const filteredListCard = listCard.filter((item) => item.card_id !== payload);
      return {
        ...state,
        creditCard: filteredListCard,
      };
    },
  },
  {
    id: null,
    email: null,
    first_name: null,
    last_name: null,
    avatar: null,
    date_of_birth: null,
    weight: null,
    height: null,
    gender: null,
    creditCard: [],
    has_friend: null,
    hasPaymentFailed: null,
  },
);
