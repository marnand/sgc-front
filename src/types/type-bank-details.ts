export enum AccountType {
  corrente = 1,
  poupanca
}

export interface BankDetails {
  id: string;
  bank: string;
  agency: string;
  account: string;
  accountType: AccountType;
}

export interface RegisterBankDetails {
  bank: string;
  agency: string;
  account: string;
  accountType: AccountType;
}
