import { isIpad } from '@src/constants/constants';

export const fontSizes = {
  screenHeader: '24px',
  closeIcon: isIpad ? '32px' : '24px',
  subheading: '22px',
  donationTitle: '18px',
  arrowFlowTitle: '24px',
  arrowFlowDescription: '16px',
  inputTextLabel: isIpad ? '22px' : '14px',
  cardText: '14px',
  sectionTitle: '18px',
  sectionText: isIpad ? '20px' : '14px',
  buttonText: isIpad ? '22px' : '16px',
  ProfileTitle: '16px',
  ProfileContent: '14px',
  homelessUserDetails: isIpad ? '22px' : '14px',
};

export const fontStyles = {
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
};
