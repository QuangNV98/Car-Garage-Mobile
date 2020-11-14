import {RootState} from '@src/boot/rootReducers';
import system from '@src/constant/system';
import ButtonComponent from '@src/containers/components/button';
import {
  offLoadingAction,
  offUpdateDataAction,
  onLoadingAction,
  onUpdateDataAction,
} from '@src/containers/redux/common/actions';
import {timeStartAyncs} from '@src/screens/myCommitment/services';
import {colors, common} from '@src/styles';
import {ms} from '@src/styles/scalingUtils';
import {appleHealthKit, location, permission} from '@src/utils/index';
import moment from 'moment';
import React, {FC, useEffect, useState} from 'react';
import {Alert, FlatList, RefreshControl, Text, TouchableOpacity, View} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import Dash from 'react-native-dash';
import ProgressCircle from 'react-native-progress-circle';
import {useDispatch, useSelector} from 'react-redux';
import {addCommitmentFinishScreen} from '../addCommitment/finishOnBoarding/navigation';
import {addCommitmentMapCheckInScreen} from '../mapCheckin/navigation';
import {getListCommitmentAction, setListCommitmentAction, setLoadCommitmentAction} from '../redux/actions';
import {getAccountCommitments} from '../services';
import {addCommitmentStartRunningScreen} from '../startRunning/navigation';
import styles from '../styles';
import {IListData, IProps, IState} from './propState';

export const ListCommitmentComponent: FC<IProps> = (props: IProps) => {
  const dispatch = useDispatch();
  const flatListRef = React.useRef(null);

  props = useSelector<RootState, IProps>((state: RootState) => ({
    ...props,
    loadList: state.screens.myCommitments.list.loadList,
    countActive: state.screens.myCommitments.list.countActive,
    countFinish: state.screens.myCommitments.list.countFinish,
    pageNumber: state.screens.myCommitments.list.pageNumber,
    listData: state.screens.myCommitments.list.listData,
    isUpdated: state.common.isUpdated,
    status_name: state.common.status.status_name,
    status: state.common.status,
    getListCommitmentAction: (pageNumber: number, status: string) =>
      dispatch(getListCommitmentAction(pageNumber, status)),
    setLoadCommitmentAction: (loadList: boolean, pageNumber: number) =>
      dispatch(setLoadCommitmentAction(loadList, pageNumber)),
    setListCommitmentAction: (
      countActive: number,
      countFinish: number,
      listData: IListData[],
      pageNumber: number,
      loadList: boolean,
    ) => dispatch(setListCommitmentAction(countActive, countFinish, listData, pageNumber, loadList)),
    offUpdateDataAction: () => dispatch(offUpdateDataAction()),
    onUpdateDataAction: () => dispatch(onUpdateDataAction()),
    onLoadingAction: () => dispatch(onLoadingAction()),
    offLoadingAction: () => dispatch(offLoadingAction()),
  }));

  const [state, setState] = useState<IState>({
    refreshing: false,
  });

  useEffect(() => {
    function runTimer() {
      if (props.isUpdated === true && props.listData.length > 0) {
        BackgroundTimer.runBackgroundTimer(async () => {
          const timeStart = await timeStartAyncs();
          const result = await appleHealthKit.getDataHealth(timeStart.data);
          let dataBurnCalories = 0;
          let dataBiking = 0;
          // let dataRunning = 0;
          let dataStep = 0;

          if (result.dataBurnCalories.length > 0) {
            dataBurnCalories = dataBurnCalories + result.dataBurnCalories[result.dataBurnCalories.length - 1].value;
          }
          if (result.dataBiking.length > 0) {
            dataBiking = dataBiking + result.dataBiking[result.dataBiking.length - 1].value;
          }
          // if (result.dataRunning.length > 0) {
          //   dataRunning = dataRunning + result.dataRunning[result.dataRunning.length - 1].value;
          // }
          if (result.dataStep.length > 0) {
            dataStep = dataStep + result.dataStep[result.dataStep.length - 1].value;
          }

          props.listData.map(async (x) => {
            if (x.commitment_type === 'DAILY_WEEKLY') {
              if (x.goal_id === 1) {
                x.commitment_details_process = x.commitment_details_process + dataBurnCalories;
              }
              // if (x.goal_id === 2) {
              //   x.commitment_details_process = x.commitment_details_process + dataRunning;
              // }
              if (x.goal_id === 3) {
                x.commitment_details_process = x.commitment_details_process + dataBiking;
              }
              if (x.goal_id === 4) {
                x.commitment_details_process = x.commitment_details_process + dataStep;
              }
            } else {
              if (x.goal_id === 1) {
                x.commitment_process = x.commitment_process + dataBurnCalories;
              }
              // if (x.goal_id === 2) {
              //   x.commitment_process = x.commitment_process + dataRunning;
              // }
              if (x.goal_id === 3) {
                x.commitment_process = x.commitment_process + dataBiking;
              }
              if (x.goal_id === 4) {
                x.commitment_process = x.commitment_process + dataStep;
              }
              // if ((x.commitment_process / parseFloat(x.commitment_target)) * 100 >= 50) {
              //   await createCloserNotification(x.id);
              // }
            }
          });

          props.setListCommitmentAction(
            props.countActive,
            props.countFinish,
            props.listData,
            props.pageNumber,
            props.loadList,
          );
        }, 900000);
        props.offUpdateDataAction();
      }
    }

    runTimer();

    async function stopTimer() {
      await BackgroundTimer.stopBackgroundTimer();
    }

    if (props.loadList) {
      stopTimer();
      props.getListCommitmentAction(props.pageNumber, props.status_name);
      props.onUpdateDataAction();
    }
  }, [props.loadList]);

  useEffect(() => {
    if (props.status_name && props.status.loading) {
      getCommitments();
    }
  }, [props.status_name]);

  const getCommitments = async () => {
    if (flatListRef) {
      flatListRef.current?.scrollToOffset({animated: true, offset: 0});
      // props.onLoadingAction();
      const result = await getAccountCommitments(1, system.PAGE_SIZE, props.status_name);
      // if (props.status_name === 'ACTIVE') {
      //   if (result) {
      //     result.list_commitments.map(async (item) => {
      //       if (
      //         item.commitment_type === 'STANDARD' &&
      //         (item.commitment_process / parseFloat(item.commitment_target)) * 100 >= 50
      //       ) {
      //         await createCloserNotification(item.id);
      //       } else if (
      //         item.commitment_type === 'DAILY_WEEKLY' &&
      //         (item.count_finish / item.commitment_target_time) * 100 >= 50
      //       ) {
      //         await createCloserNotification(item.id);
      //       }
      //     });
      //   }
      // }
      props.status.loading = false;
      // props.offLoadingAction();
      props.setListCommitmentAction(props.countActive, props.countFinish, result.list_commitments, 1, false);
    }
  };

  const _onPressLocationCommitmentDetail = (item) => async () => {
    if (item.commitment_process < parseInt(item.commitment_target)) {
      permission.permissionMap();
      const getLocation = await location.getCurrentPosition();
      const region = {
        latitude: getLocation.coords.latitude,
        longitude: getLocation.coords.longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      };
      addCommitmentMapCheckInScreen(props.componentId, {region, item});
    } else {
      Alert.alert('Warning', 'The commitment has been checked in completely!');
    }
  };

  const _onPressCommitmentDetail = (item) => async () => {
    if (item.goal_id === 2) {
      addCommitmentStartRunningScreen(props.componentId, {item});
    } else {
      addCommitmentFinishScreen(props.componentId, {item});
    }
  };

  const handleLoadMore = () => {
    if (props.listData?.length < props.countActive + props.countFinish) {
      props.setLoadCommitmentAction(true, props.pageNumber + 1);
    }
  };

  const onRefresh = async () => {
    setState((state: IState) => ({
      ...state,
      refreshing: true,
    }));

    const result = await getAccountCommitments(1, system.PAGE_SIZE, props.status_name);
    props.setListCommitmentAction(props.countActive, props.countFinish, result.list_commitments, 1, false);
    if (result) {
      setState((state: IState) => ({
        ...state,
        refreshing: false,
      }));
    }
  };

  const _renderItem = ({item, index}) => {
    const title = system.DATA_GOAL.find((x) => x.id === item.goal_id).text;
    let unit = '';
    switch (item.goal_id) {
      case 1:
        unit = 'calories';
        break;
      case 4:
        unit = 'steps';
        break;
      case 5:
        unit = 'times';
        break;
      default:
        unit = item.unit;
        break;
    }

    let unitSingular = '';
    switch (item.goal_id) {
      case 1:
        unitSingular = 'calories';
        break;
      case 4:
        unitSingular = 'step';
        break;
      case 5:
        unitSingular = 'time';
        break;
      default:
        unitSingular = item.unit.slice(0, item.unit.length - 1);
        break;
    }

    const idGoal = system.DATA_GOAL.find((x) => x.id === item.goal_id).id;

    const times = system.DATA_DATE.find((x) => x.id === item.commitment_target_time_unit).text;
    const numberWithCommas = (value: number) => {
      return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null;
    };

    let process = (100 / item.commitment_target) * item.commitment_process;
    process = process > 100 ? 100 : process;

    let commitment_details_process = (100 / item.commitment_details_target) * item.commitment_details_process;
    commitment_details_process = commitment_details_process > 100 ? 100 : commitment_details_process;
    commitment_details_process = !commitment_details_process ? 0 : commitment_details_process;

    let total_process = (item.count_finish / item.commitment_target_time) * 100;
    total_process = total_process > 100 ? 100 : total_process;
    return (
      <TouchableOpacity onPress={_onPressCommitmentDetail(item)}>
        <View style={[styles.item, common.flexColumn]} key={`item_${index}`}>
          <View style={styles.itemTop}>
            <View style={styles.itemTopLeft}>
              <View style={styles.wrapItemTitle}>
                <Text style={styles.itemTitle}>{title}</Text>
                {/* <View style={[common.flexRow, common.ml10]}>
                  <Image style={[styles.imgTitle, common.pr3]} source={goalImg} />
                  <Image style={styles.imgTitle} source={subGoalImg} />
                </View> */}
              </View>
              <Text style={styles.itemTextDetails}>
                {item.unit === 'meters'
                  ? (item.commitment_target / 0.000621371192).toFixed(0)
                  : parseFloat(item.commitment_target).toFixed(0)}{' '}
                {item.unit === 'meters'
                  ? parseFloat(item.commitment_target) / 0.000621371192 > 1
                    ? unit
                    : unitSingular
                  : parseFloat(item.commitment_target) > 1
                  ? unit
                  : unitSingular}{' '}
                {item.commitment_type === 'DAILY_WEEKLY'
                  ? `per ${times.toLocaleLowerCase().slice(0, times.length - 1)} `
                  : ''}
                over the next {item.commitment_target_time}{' '}
                {item.commitment_target_time > 1
                  ? times.toLocaleLowerCase()
                  : times.toLocaleLowerCase().slice(0, times.length - 1)}
              </Text>
            </View>
            <View style={styles.itemTopRight}>
              {item.commitment_type === 'DAILY_WEEKLY' ? (
                <View style={[styles.wrapCircle, common.mr10]}>
                  <ProgressCircle
                    percent={commitment_details_process}
                    radius={26}
                    borderWidth={ms(6)}
                    color="#BBE7DF"
                    shadowColor={colors.nude}
                    bgColor={colors.white}>
                    <Text style={styles.circleText}>
                      {parseInt(commitment_details_process.toString()) === commitment_details_process
                        ? commitment_details_process
                        : commitment_details_process.toFixed(1)}
                      %
                    </Text>
                  </ProgressCircle>
                  {item.commitment_type === 'DAILY_WEEKLY' ? (
                    <Text style={styles.circleLabel}>
                      {item.commitment_target_time_unit === 'DAYS' ? 'Day' : 'Week'}
                    </Text>
                  ) : null}
                </View>
              ) : null}
              {item.commitment_type === 'STANDARD' ? (
                <View style={[styles.wrapCircle, common.mr10]}>
                  <ProgressCircle
                    percent={process}
                    radius={26}
                    borderWidth={ms(6)}
                    color="#BBE7DF"
                    shadowColor={colors.nude}
                    bgColor={colors.white}>
                    <Text style={styles.circleText}>
                      {parseInt(process.toString()) === process ? process : process.toFixed(1)}%
                    </Text>
                  </ProgressCircle>
                  <Text style={styles.circleLabel}>Total</Text>
                </View>
              ) : (
                <View style={[styles.wrapCircle, common.mr10]}>
                  <ProgressCircle
                    percent={total_process}
                    radius={26}
                    borderWidth={ms(6)}
                    color="#BBE7DF"
                    shadowColor={colors.nude}
                    bgColor={colors.white}>
                    <Text style={styles.circleText}>
                      {parseInt(total_process.toString()) === total_process ? total_process : total_process.toFixed(1)}%
                    </Text>
                  </ProgressCircle>
                  <Text style={styles.circleLabel}>Total</Text>
                </View>
              )}
            </View>
          </View>
          <View>
            <Text style={styles.itemTextDate}>
              {moment(item.created_at).format('MMM DD')} - {moment(item.finish_at).format('MMM DD, YYYY')}
            </Text>
          </View>
          {idGoal === 5 ? (
            <View>
              <ButtonComponent
                text="Check into location"
                // clear={true}
                styleContainer={styles.btnView}
                // styleButton={styles.btnViewContainer}
                styleText={styles.textView}
                onPress={_onPressLocationCommitmentDetail(item)}
                hasIcon={true}
                iconName="location-on"
              />
            </View>
          ) : null}

          <Dash style={styles.dash} dashGap={4} dashLength={6} dashThickness={2} dashColor="#C0C5CF" />
          <View style={styles.itemBottom}>
            <View style={[{flex: 1}, common.mr5]}>
              <Text>
                <Text style={styles.itemBottomText}>Recipients: </Text>
                <Text style={styles.itemBottomName}>
                  {item.email_friend !== ''
                    ? item.name_friend
                      ? item.name_friend
                      : item.first_name && item.last_name !== ''
                      ? `${item.first_name} ${item.last_name}`
                      : null
                    : ''}
                </Text>
              </Text>
            </View>
            <View style={common.flexRow}>
              <Text style={styles.itemBottomText}>Stake: </Text>
              <Text style={styles.itemBottomName}>
                {!item.amount_bet ? 'No stake' : `$${numberWithCommas(item.amount_bet)}`}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return props.listData.length > 0 ? (
    <FlatList
      ref={flatListRef}
      data={props.listData}
      renderItem={_renderItem}
      keyExtractor={(item) => `${item.id}`}
      onEndReachedThreshold={0.5}
      onEndReached={handleLoadMore}
      style={styles.list}
      refreshControl={<RefreshControl refreshing={state.refreshing} onRefresh={onRefresh} />}
    />
  ) : (
    <View style={styles.listNoPledge}>
      <Text style={styles.textNoPledge}>No active pledges</Text>
    </View>
  );
};
