export type HomelessPerson = {
  firstName: string;
  surname: string;
  phoneNumber: string;
  email: string;
  id?: string;
  lastQrCodeExpiryDate: number;
  dateOfBirth: string;
  gender: string;
  balance: number;
};

export type PeopleDonation = {
  amount: number;
  name: string;
  id: string;
};
