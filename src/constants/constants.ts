import { Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
export const isIpad = Platform.OS === 'ios' && Math.min(width, height) >= 768;
