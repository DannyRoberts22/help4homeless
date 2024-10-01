export type ShelterItem = {
  name: string;
  vicinity: string;
  opening_hours: {
    open_now: boolean;
  };
  photos: {
    html_attributions: string[];
    photo_reference: string;
  }[];
};
