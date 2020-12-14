import {handleActions} from 'redux-actions';
import {removeCreditCardAction, setAccountAction, setCreditCardAction} from './actions';
import IActionState from './state';

export default handleActions<IActionState, any>(
  {
    [setAccountAction.toString()]: (state, {payload}) => ({
      ...state,
      id: payload.id,
      name: payload.name,
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
