import {createActions} from 'redux-actions';

const actions = createActions({
  INVALID_TOKEN_ACTION: null,
  SET_ACCOUNT_ACTION: (userInfor) => userInfor,
  SET_CREDIT_CARD_ACTION: (card_id: string, four_digit_card: string) => ({card_id, four_digit_card}),
  REMOVE_CREDIT_CARD_ACTION: (card_id: string) => card_id,
});

export const {invalidTokenAction, setAccountAction, setCreditCardAction, removeCreditCardAction} = actions;
