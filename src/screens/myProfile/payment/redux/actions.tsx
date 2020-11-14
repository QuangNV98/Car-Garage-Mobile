import {createActions} from 'redux-actions';

const actions = createActions({
  ADD_CARD_ACTION: (card_id: string, four_digit_card: string) => ({card_id, four_digit_card}),
  REMOVE_CARD_ACTION: (card_id: string) => card_id,
  UPDATE_CARD_ACTION: (card_id: string, four_digit_card: string) => ({card_id, four_digit_card}),
});

export const {addCardAction, removeCardAction, updateCardAction} = actions;
