export default interface IActionState {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  date_of_birth: Date;
  weight: number;
  height: number;
  gender: boolean;
  creditCard: {
    card_id: string;
    four_digit_card: string;
  }[];
  has_friend: boolean;
  hasPaymentFailed: boolean;
}
