import loginSaga from './accounts/signin/redux/operations';
import myCommitmentSaga from './myCommitment/index.sagas';
import myProfileSaga from './rescue/index.sagas';
import notificationSaga from './notifications/redux/operations';
import transSaga from './transactions/redux/operations';

export default {
  ...loginSaga,
  ...myCommitmentSaga,
  ...myProfileSaga,
  ...notificationSaga,
  ...transSaga
};
