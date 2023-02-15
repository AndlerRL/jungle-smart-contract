// Action data for the `sign` action
export interface SignActionData {
  account_name: string;
  created_at: number;
  session: string;
}

export type SignActionDataResponse = {
  session: string | null
}