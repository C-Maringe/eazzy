import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import React from 'react';
import {responsiveHeight} from 'react-native-responsive-dimensions';

import {components} from '../components';
import {svg} from '../assets/svg';
import {theme} from '../constants';

const paymentsList = [
  {
    id: 1,
    title: 'Transfer money',
    icon: require('../assets/images/dollar-circle.png'),
  },
  {
    id: 2,
    title: 'School fees',
    icon: require('../assets/images/mobile-dollar.png'),
  },
  {
    id: 3,
    title: 'Visa card payment',
    icon: require('../assets/images/visa-card.png'),
  },
  {
    id: 4,
    title: 'Utility bills',
    icon: require('../assets/images/utility-bills.png'),
  },
  {
    id: 5,
    title: 'Transport',
    icon: require('../assets/images/dollar-circle.png'),
  },
  {
    id: 6,
    title: 'Insurance',
    icon: require('../assets/images/dollar-circle.png'),
  },
  {
    id: 7,
    title: 'Tithes and offering',
    icon: require('../assets/images/church.png'),
  },
  {
    id: 8,
    title: 'Donations',
    icon: require('../assets/images/donations.png'),
  },
];

const Payments = ({navigation}) => {
  const renderHeader = () => {
    return <components.Header title="Payments" goBack={true} />;
  };

  const renderContent = () => {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingBottom: 20,
          paddingTop: 10,
        }}
      >
        {paymentsList.map((item, index, array) => {
          const last = index === array.length - 1;

          return (
            <TouchableOpacity
              key={index}
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: last ? 0 : responsiveHeight(1.8),
              }}
              onPress={() => {
                item.title === 'Mobile payment' &&
                  navigation.navigate('MobilePayment');
                item.title === 'Money transfer' &&
                  navigation.navigate('FundTransfer');
                item.title === 'IBAN payment' &&
                  navigation.navigate('IBANPayment');
              }}
            >
              <Image
                source={item.icon}
                style={{
                  width: responsiveHeight(4.4),
                  aspectRatio: 1,
                }}
              />
              <Text
                style={{
                  marginRight: 'auto',
                  marginLeft: 14,
                  ...theme.fonts.SourceSansPro_Regular_14,
                  lineHeight:
                    theme.fonts.SourceSansPro_Regular_14.fontSize * 1.6,
                  color: theme.colors.mainDark,
                }}
              >
                {item.title}
              </Text>
              <svg.InfoSvg />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  return (
    <components.SafeAreaView>
      {renderHeader()}
      {renderContent()}
    </components.SafeAreaView>
  );
};

export default Payments;
