import {
  View, StatusBar
} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

import { components } from '../components';
import { theme } from '../constants';

import Dashboard from '../screens/tabs/Dashboard';

const TabNavigator = () => {
  const currentTabScreen = useSelector((state) => state.tab.screen);

  const renderStatusBar = () => {
    return (
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.white} />
    );
  };

  const renderHeader = () => {
    return (
      <components.Header title="eazzypay" goBack={false} />
    );
  };

  const renderScreen = () => {
    return (
      <View style={{ flex: 1 }}>
        <Dashboard />
      </View>
    );
  };

  return (
    <components.SafeAreaView
      edges={['top']}
      background={currentTabScreen === 'Notification' ? true : false}
    >
      {renderStatusBar()}
      {/* {renderHeader()} */}
      {renderScreen()}
    </components.SafeAreaView>
  );
};

export default TabNavigator;
