export default interface IActionState {
  goal: number;
  target: number;
  target_time: number;
  target_time_unit: string;
  lat: number;
  lng: number;
  amount_fine: number;
  stake_to: string;
  email_friend: string;
  status: string;
  card_number: string;
  card_valid_from: string;
  card_cvc: string;
  zip_code: string;
  location_name: string;
  commitment_type: string;
  card_id: string;
  four_digit_card: string;
  start_date: Date;
  unit: string;
  timezone: string;
}
