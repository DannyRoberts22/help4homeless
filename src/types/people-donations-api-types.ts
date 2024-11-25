export type PeopleDonations = {
  login: {uuid: string};
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
