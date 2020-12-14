const TOKEN = '@@token';
const PASS_STARTED = '@@pass';
const FCM_TOKEN = '@@fcmToken';
const ACCOUNT_MIN_DATE = '@@accountMinDate';
const BACKGROUND_TIMER = 'backgroundTimer';
const CURRENT_SCREEN = 'currentScreen';

const RESPONSE_STATUS = {
  CREATED: 201,
  SUCESS: 200,
  NOT_FOUND: 404,
  INTERVAL_SERVER: 500,
  FORBIDDEN: 403,
};

const DATA_GOAL = [
  {
    id: 1,
    text: 'Burn Calories',
  },
  {
    id: 2,
    text: 'Run',
  },
  {
    id: 3,
    text: 'Biking',
  },
  {
    id: 4,
    text: 'Steps',
  },
  {
    id: 5,
    text: 'Check into a location',
  },
];

const DATA_DATE = [
  {
    id: 'DAYS',
    text: 'Days',
  },
  {
    id: 'WEEKS',
    text: 'Weeks',
  },
  {
    id: 'MONTHS',
    text: 'Months',
  },
  {
    id: 'YEARS',
    text: 'Years',
  },
];

const DATA_UNIT = [
  {
    id: 'miles',
    text: 'miles',
  },
  {
    id: 'meters',
    text: 'meters',
  },
];

enum STAKE {
  NO_STAKE = 'NO_STAKE',
  STAKE_TO_FRIEND = 'STAKE_TO_FRIEND',
}

enum STATUS {
  IN_ACTIVE = 'IN_ACTIVE',
  ACTIVE = 'ACTIVE',
  BLOCK = 'BLOCK',
  DELETE = 'DELETE',
}

enum GOAL {
  BURN_CALORIES = 1,
  RUNNING = 2,
  BIKING = 3,
  STEP = 4,
  CHOOSE_LOCATION = 5,
}

enum COMMITMENT_TYPE {
  STANDARD = 'STANDARD',
  DAILY_WEEKLY = 'DAILY_WEEKLY',
}

const PAGE_SIZE = 20;
const STEP = 6;

const COMMITMENT_STATUS = [
  {
    id: 1,
    text: 'Active',
  },
  {
    id: 2,
    text: 'Completed',
  },
  {
    id: 3,
    text: 'Failed',
  },
];

const USER_INFO = 'user_info'

export default {
  TOKEN,
  RESPONSE_STATUS,
  DATA_GOAL,
  DATA_DATE,
  STAKE,
  STATUS,
  GOAL,
  PAGE_SIZE,
  COMMITMENT_TYPE,
  STEP,
  PASS_STARTED,
  ACCOUNT_MIN_DATE,
  BACKGROUND_TIMER,
  CURRENT_SCREEN,
  COMMITMENT_STATUS,
  DATA_UNIT,
  FCM_TOKEN,
  USER_INFO
};
