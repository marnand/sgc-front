export interface BankDetails {
  id: string;
  bank: string;
  agency: string;
  account: string;
  accountType: "Corrente" | "Poupança";
}