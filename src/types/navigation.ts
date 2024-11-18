import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  ManageCrops: undefined;
  RobotController: undefined;
  ManagePests: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;
export type ManageCropsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ManageCrops'
>;
export type RobotScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'RobotController'
>;

export type ManagePestScreenNavigationProp=StackNavigationProp<
  RootStackParamList,
  'ManagePests'
>;