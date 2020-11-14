import InternetError from '@src/containers/components/internetError';
import LoadingComponent from '@src/containers/components/loading';
import React, {Fragment, ReactNode} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from './rootReducers';

interface IProps {
  children?: ReactNode;
  errorMess?: string;
}

export default function RootComponent(props: IProps) {
  props = useSelector<RootState, IProps>((state: RootState) => ({
    ...props,
    errorMess: state.common.errorMess,
  }));

  return (
    <Fragment>
      {props.children}
      <InternetError />
      {/* <LoadingComponent /> */}
    </Fragment>
  );
}
