import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux'
import {colors, common} from '@src/styles';
import {Text, TouchableOpacity, View, FlatList, Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';
import {IProps, IState} from './propState';
import styles from './styles';
import BottomTabNavigation from '@src/containers/components/bottomNavigation';
import {APP_MY_FRIEND_SCREEN} from './navigation';
import {rootDetailBillScreen} from './detailBill/navigation';
import { TabView, SceneMap ,TabBar} from "react-native-tab-view";
import {getListTransactionsFixingAction, getListTransactionsCompletedAction, getListTransactionsGuaranteeAction} from './redux/actions';


class MyFriendComponent extends React.Component<IProps> {
  state: IState = {
    status: false,
    tabView: {
      index: 0,
      routes: [
        { key: "One", title: ("Fixing") },
        { key: "Two", title: ("Guarantee")},
        { key: "Three", title: ("Completed")},
      ]
    },
  };

   componentDidMount() {
    this.props.getListTransactionsFixingAction();
    this.props.getListTransactionsCompletedAction();
    this.props.getListTransactionsGuaranteeAction();

  }
  _onPressCommitmentDetail = (item) => () => {
    rootDetailBillScreen(this.props.componentId, {item})
  };

  onTouch = (value) => {
    this.setState({status: value});
  };

  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={this._onPressCommitmentDetail(item)} key={item.ID_TRANS}>
        <View style={[styles.item, common.flexColumn]} key={`item_${index}`}>
          <View style={styles.itemTop}>
            <View style={styles.wrapItemTitle}>
              <Text style={styles.itemTitle}>
                {item.ID_TRANS} - {item.CAR_NAME} - {item.CAR_NUM}
              </Text>
            </View>
            {item.STATUS === 1 ? (
              <Icon name="wrench" type="font-awesome" color={colors.silverTree} size={30} />
            ) : (
              <Icon name="gears" type="font-awesome" color={colors.silverTree} size={30} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderItemStatus = ({item}) => {
    return (
      <TouchableOpacity
        key={item.name}
        style={{
          padding: 5,
          backgroundColor: this.state.status == item.name ? colors.silverTree : 'white',
          margin: 5,
          borderColor: this.state.status == item.value ? colors.silverTree : '#333',
          borderWidth: 1,
        }}>
        <Text style={{fontSize: 12, color: this.state.status == item.value ? 'white' : '#333'}}>{item.value}</Text>
      </TouchableOpacity>
    );
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
      case "One":
        return <FlatList
              data={this.props.fixingTrans}
              renderItem={this._renderItem}
              keyExtractor={(item) => `${item.id}`}
              style={styles.list}
            />
        case "Two":
          return <FlatList
          data={this.props.guaranteeTrans}
          renderItem={this._renderItem}
          keyExtractor={(item) => `${item.id}`}
          style={styles.list}
        />
        case "Three":
          return <FlatList
          data={this.props.completedTrans}
          renderItem={this._renderItem}
          keyExtractor={(item) => `${item.id}`}
          style={styles.list}
        />
    }
  }

  render() {
    return (
      <Fragment>
        <View style={common.flex_1}>
          <View style={common.container}>
            <Text style={styles.pageTitle}>Transactions</Text>
            <TabView
            // style={Styles.tabviewContainer}
            renderTabBar={(props) =>
              <TabBar
              {...props}
               style={{backgroundColor: '#fff'}}
               activeColor={colors.darkMain}
               inactiveColor={colors.darkGray}
               indicatorStyle ={{backgroundColor:colors.silverTree}}
              />
            }
            lazy={true} 
            navigationState={this.state.tabView}
            renderScene={this._renderScene}
            onIndexChange={(index)=>{
              this.setState({ tabView: { index, routes: this.state.tabView.routes } });
            }}
            initialLayout={{ width: Dimensions.get("window").width }}
          />
          </View>
        </View>
        <BottomTabNavigation
          componentId={this.props.componentId}
          activeTab={APP_MY_FRIEND_SCREEN}
          showAddCommitments={true}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({fixingTrans: state.screens.transReducer.data, completedTrans: state.screens.transReducer.dataComplete, guaranteeTrans: state.screens.transReducer.dataGuarantee, isLoading: state.common.isLoading});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({getListTransactionsFixingAction, getListTransactionsCompletedAction, getListTransactionsGuaranteeAction}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MyFriendComponent);
