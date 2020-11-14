import addCommitmentSaga from './addCommitment/redux/operations';
import checkInLocationSaga from './mapCheckin/redux/operations';
import listCommitmentSaga from './redux/operations';

export default {
  ...addCommitmentSaga,
  ...listCommitmentSaga,
  ...checkInLocationSaga,
};
