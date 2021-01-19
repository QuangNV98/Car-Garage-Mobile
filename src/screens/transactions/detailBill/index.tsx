import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {colors, common} from '@src/styles';
import {Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {IProps, IState} from './propState';
import styles from './styles';
import {Header} from 'react-native-elements';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import {Navigation} from 'react-native-navigation';

class DetailBill extends React.Component<IProps> {
  state: IState = {
    status: false,
  };

  componentDidMount() {
    // this.props.getListNotificationsAction();
  }

  _goBack = () => Navigation.pop(this.props.componentId);

  render() {
    return (
      <Fragment>
        <View style={[common.flex_1]}>
          <Header
            leftComponent={
              <TouchableOpacity
                onPress={this._goBack}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <Icon5 name="chevron-left" size={15} />
              </TouchableOpacity>
            }
            centerComponent={<Text style={common.headerTitle}>Details</Text>}
          />
          <View style={[{backgroundColor: colors.bgColor}]}>
            <View style={styles.section}>
              <Icon style={styles.icon} name="list" type="font-awesome" color={colors.silverTree} size={20} />
              <View>
                <Text>Ngày tiếp nhận: {this.props.item.START_DT}</Text>
                <Text>Ngày dự kiến hoàn thành: {this.props.item.END_DT}</Text>
              </View>
            </View>
            <View style={styles.section}>
              <Icon style={styles.icon} name="truck" type="font-awesome" color={colors.silverTree} size={20} />
              <View>
                <Text style={styles.title}>Trạng thái: {this.props.item.STATUS === 1 ? 'Tiếp nhận' : this.props.item.STATUS === 2 ? 'Đang sửa chữa' : 'Hoàn thành'}</Text>
                <Text style={styles.title}>Ghi chú: {this.props.item.CAR_ABOUT}</Text>
              </View>
            </View>
            <View style={styles.section}>
              <Icon style={styles.icon} name="user" type="font-awesome" color={colors.silverTree} size={20} />
              <View>
                <Text style={styles.title}>Thông tin người nhận</Text>
                <Text>{this.props.item.NAME_CUS}</Text>
                <Text>{this.props.item.PHONE_CUS}</Text>
                <Text>{this.props.item.ADDRESS_CUS}</Text>
              </View>
            </View>
            <View style={styles.section}>
              <Icon style={styles.icon} name="car" type="font-awesome" color={colors.silverTree} size={20} />
              <View>
                <Text style={styles.title}>Thông tin xe</Text>
                <Text>Tên xe: {this.props.item.CAR_NAME}</Text>
                <Text>Model: {this.props.item.CAR_MODEL}</Text>
                <Text>Biển: {this.props.item.CAR_NUM}</Text>
                <Text>Màu: {this.props.item.CAR_COLOR}</Text>

              </View>
            </View>
            { this.props.item.FEE_TOTAL ? 
            <View style={styles.section}>
              <Icon style={styles.icon} name="usd" type="font-awesome" color={colors.silverTree} size={20} />
              <View>
                <Text>Giá vật tư: {this.props.item.FEE_EQUIP}</Text>
                <Text>Tiền công: {this.props.item.FEE_WORK}</Text>
                <Text>Tổng tiền: {this.props.item.FEE_TOTAL}</Text>
              </View>
            </View> : null}
          </View>
        </View>
      </Fragment>
    );
  }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(DetailBill);
