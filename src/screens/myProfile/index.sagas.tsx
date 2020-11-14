import accountSettingSaga from './accountSettings/redux/operations';
import paymentSaga from './payment/redux/operations';

export default {
  ...accountSettingSaga,
  ...paymentSaga,
};
