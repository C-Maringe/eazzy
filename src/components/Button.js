import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

import { theme } from '../constants';

const Button = ({ title, onPress, containerStyle, lightShade, backgroundColor = "", customBtn = false }) => {
  return (
    <View style={{ ...containerStyle }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          width: '100%',
          height: 40,
          backgroundColor: backgroundColor === "" ? theme.colors.blue2 : backgroundColor,
        }}
        onPress={onPress}
      >
        <Text
          style={{
            color: lightShade ? theme.colors.mainDark : theme.colors.white,
            textTransform: 'capitalize',
            ...theme.fonts.SourceSansPro_SemiBold_16,
            marginRight: customBtn ? 60 : "",
            textAlign: "center"
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
