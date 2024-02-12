import { View, Text, ScrollView, Image } from 'react-native';
import React from 'react';
import {
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { components } from '../components';
import { theme } from '../constants';

const PaymentFailed = ({ navigation, route }) => {

  const receivedData = route.params;

  console.log(receivedData)

  const renderContent = () => {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          justifyContent: 'center',
        }}
      >
        <Image
          source={require('../assets/icons/cancel.png')}
          style={{
            width: 80,
            height: 80,
            marginBottom: theme.sizes.marginBottom_30,
          }}
        />
        <Text
          style={{
            ...theme.fonts.SourceSansPro_SemiBold_24,
            lineHeight: theme.fonts.SourceSansPro_SemiBold_24.fontSize * 1.2,
            marginBottom: theme.sizes.marginBottom_30,
            color: theme.colors.mainColor,
          }}
        >
          Oops! {receivedData?.data === "FAILED" ? receivedData?.from.toUpperCase() + " Purchase Failed" : receivedData?.data + "\n" + receivedData?.from.toUpperCase() + " FAILED"}
        </Text>
        <Text
          style={{
            ...theme.fonts.SourceSansPro_Regular_16,
            lineHeight: theme.fonts.SourceSansPro_Regular_16.fontSize * 1.6,
            color: theme.colors.bodyTextColor,
          }}
        >
          {/* Macomputers aya anoita zvaaudzwa, hamenowo kuti chiichaitika. */}
        </Text>
      </ScrollView>
    );
  };

  const renderFooter = () => {
    return (
      <View
        style={{
          padding: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <components.Button
          title="Cancel"
          containerStyle={{
            width: responsiveWidth(42),
          }}
          onPress={() => {
            navigation.navigate('TabNavigator');
          }}
        />
        <components.Button
          title="Try Again"
          containerStyle={{
            width: responsiveWidth(42),
          }}
          onPress={() => navigation.goBack()}
        />
      </View>
    );
  };

  return (
    <components.SafeAreaView background={true}>
      {renderContent()}
      {renderFooter()}
    </components.SafeAreaView>
  );
};

export default PaymentFailed;
