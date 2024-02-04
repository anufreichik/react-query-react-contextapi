export interface IAddressBookItem {
  id: number;
  name: string;
  address: string;
  city: string;
  zip: string;
  phone: string;
  email: string;
}

export enum Actions {
  PREV = "PREV",
  NEXT = "NEXT",
}
