import {createActions} from 'redux-actions';

const actions = createActions({
  CHECK_IN_LOCATION_ACTION: (id: number) => ({id}),
});

export const {checkInLocationAction} = actions;
