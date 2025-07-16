export enum AccountType {
  corrente = 1,
  poupanca
}

export interface BankDetails {
  id: string | null;
  bank: string;
  agency: string;
  account: string;
  accountType: AccountType;
}
