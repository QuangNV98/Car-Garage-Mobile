// import React from 'react';
// import {Sentry} from 'react-native-sentry';

// Sentry.config(
//   'https://d4af1b3fbdd24c45b1b711b2fbd56f1c@sentry.io/1510115',
// ).install();

// Sentry.setTagsContext({
//   environment: 'Develop',
//   react: true,
// });

// Sentry.setUserContext({
//   email: 'manhninh91@gmail.com',
//   extra: {is_admin: true},
// });

// export default class ErrorBoundary extends React.Component {
//   componentDidCatch(error, errorInfo) {
//     Sentry.captureException(error, {
//       extra: errorInfo,
//     });
//   }

//   render() {
//     return this.props.children;
//   }
// }
