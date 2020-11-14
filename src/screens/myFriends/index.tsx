import config from '@src/constant/config';
import React, {Fragment} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';

interface IProps {
  componentId: string;
}

class MyFriendComponent extends React.Component<IProps> {
  render() {
    return (
      <Fragment>
        <Text>ENV: {config.HOST_API}</Text>
      </Fragment>
    );
  }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(MyFriendComponent);
