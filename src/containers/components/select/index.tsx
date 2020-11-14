// import SelectAndroidComponent from "./android";
import React from 'react';
import SelectIOSComponent from './ios';
import {IProps} from './propState';

export default function SelectComponent(props: IProps) {
  return (
    <SelectIOSComponent
      placeholder={props.placeholder}
      data={props.data}
      onValueChange={props.onValueChange}
      value={props.value}
      styleContainer={props.styleContainer}
    />
  );
  // Platform.OS == "ios" ?
  // (
  // ) : (
  //   <SelectAndroidComponent
  //     subjects={this.props.subjects}
  //     onValueChange={this.props.onValueChange}
  //     selectedSubjectIndex={this.props.selectedSubjectIndex}
  //   />
  // );
}
