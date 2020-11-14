import {IListData} from '../listCommitments/propState';

export default interface IActionState {
  loadList: boolean;
  countActive: number;
  countFinish: number;
  pageNumber: number;
  listData: IListData[];
  listProgressDetail: any;
  listDetailCheckIn: any;
}
