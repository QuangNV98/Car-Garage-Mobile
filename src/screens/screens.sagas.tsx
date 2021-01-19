import loginSaga from './accounts/signin/redux/operations';
import myCommitmentSaga from './myCommitment/index.sagas';
import transSaga from './transactions/redux/operations';

export default {
  ...loginSaga,
  ...myCommitmentSaga,
  ...transSaga
};
