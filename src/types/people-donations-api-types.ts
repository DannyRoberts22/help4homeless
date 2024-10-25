export type PeopleDonations = {
  id: number;
  name: {
    first: string;
  };
  locations: {
    state: string;
  };
  dob: {
    age: number;
  };
  picture: {
    large: string;
  };
};

export type PeopleDonationsData = {
  results: PeopleDonations[];
};
