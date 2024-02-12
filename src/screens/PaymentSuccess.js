import { View, Text, ScrollView, Image, ToastAndroid } from 'react-native';
import React, { useRef } from 'react';
import {
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import * as MediaLibrary from 'expo-media-library';
import { captureScreen } from 'react-native-view-shot';
import { components } from '../components';
import { theme } from '../constants';
import { useRoute } from '@react-navigation/native';

const PaymentSuccess = ({ navigation }) => {

  const [status, requestPermission] = MediaLibrary.usePermissions();

  const saveImageNow = async () => {
    try {
      const localUri = await captureScreen({
        format: 'png',
        quality: 1,
        result: 'tmpfile',
        snapshotContentContainer: false,
      })
      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        ToastAndroid.show("ZETDC Token screenshoot saved successfully!", ToastAndroid.BOTTOM);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const onSaveImageAsync = () => {
    if (status === null || !status?.granted) {
      requestPermission()
        .then(() => {
          saveImageNow()
        })
    } else {
      saveImageNow()
    }
  };

  const route = useRoute();
  const receivedData = route.params?.zesa;

  const renderZesaSuccess = () => {

    const handleZesadata = () => {

      for (const [key, value] of Object.entries(receivedData)) {
        const keyValues = Object.entries(receivedData).map(([key, value]) => (
          !key.includes("timeStamp") &&
          <View
            key={key}
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 10
            }}
          >
            <Text
              style={{
                ...theme.fonts.SourceSansPro_Regular_16,
                lineHeight: theme.fonts.SourceSansPro_Regular_16.fontSize * 1.6,
                color: theme.colors.bodyTextColor,
                width: 130
              }}
            >
              {key.includes("totalAmount") ? "Total Amt" : key.toUpperCase()} :
            </Text>
            <Text
              style={{
                ...theme.fonts.SourceSansPro_Regular_16,
                lineHeight: theme.fonts.SourceSansPro_Regular_16.fontSize * 1.6,
                color: theme.colors.bodyTextColor,
              }}
            >
              {key.includes("token") && value !== null ? value.replace(/(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})/, "$1 $2 $3 $4 $5") : value}
            </Text>
          </View>
        ))
        return keyValues
      }
    }

    return (
      <ScrollView
        contentContainerStyle={{
          // flexGrow: 1,
          paddingHorizontal: 20,
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            ...theme.fonts.SourceSansPro_SemiBold_24,
            lineHeight: theme.fonts.SourceSansPro_SemiBold_24.fontSize * 1.2,
            marginBottom: theme.sizes.marginBottom_30,
            color: theme.colors.mainDark,
          }}
        >
          Your ZETDC Token purchase {'\n'}was successful
        </Text>
        <View>
          {
            handleZesadata()
          }
        </View>
        <Text
          style={{
            ...theme.fonts.SourceSansPro_Regular_16,
            lineHeight: theme.fonts.SourceSansPro_Regular_16.fontSize * 1.6,
            color: theme.colors.bodyTextColor,
            textAlign: "center",
            marginTop: 30
          }}
        >
          {receivedData.timeStamp}
        </Text>
      </ScrollView>
    );
  };



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
          source={require('../assets/icons/transaction.png')}
          style={{
            marginTop: 40,
            width: 80,
            height: 80,
            marginBottom: theme.sizes.marginBottom_30,
          }}
        />
        {renderZesaSuccess()}
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
          title="Home"
          containerStyle={{
            width: responsiveWidth(42),
          }}
          onPress={() => {
            navigation.navigate('TabNavigator');
          }}
        />
        <components.Button
          title="take screenshoot"
          containerStyle={{
            width: responsiveWidth(42),
          }}
          onPress={() => {
            onSaveImageAsync()
          }}
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

export default PaymentSuccess;
