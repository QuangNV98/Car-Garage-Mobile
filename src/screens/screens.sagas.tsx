import forgotPasswordSaga from './accounts/forgotPassword/redux/operations';
import loginSaga from './accounts/signin/redux/operations';
import createNewPasswordSaga from './accounts/createNewPassword/redux/operations';
import signupSaga from './accounts/signup/redux/operations';
import verifyCodeSaga from './accounts/verifyCode/redux/operations';
import inviteFriendSaga from './myCommitment/addCommitment/contracts/redux/operations';
import myCommitmentSaga from './myCommitment/index.sagas';
import myProfileSaga from './myProfile/index.sagas';
import notificationSaga from './notifications/redux/operations';

export default {
  ...loginSaga,
  ...signupSaga,
  ...forgotPasswordSaga,
  ...verifyCodeSaga,
  ...inviteFriendSaga,
  ...myCommitmentSaga,
  ...myProfileSaga,
  ...createNewPasswordSaga,
  ...notificationSaga,
};
