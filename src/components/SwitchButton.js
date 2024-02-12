import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';

import { theme } from '../constants';

const SwitchButton = ({ value = "ZWL" }) => {
  const [switchValue, setSwitchValue] = useState(false);
  const [comVal, setComVal] = useState("ZWL")

  const handleCurrency = (comVal) => {
    comVal !== "ZWL" ? setComVal("USD") : setComVal("ZWL")
  }

  useEffect(() => {
    handleCurrency(value)
  }, [value])

  useEffect(() => {
    comVal === "ZWL" ? setSwitchValue(false) : setSwitchValue(true)
  }, [comVal])

  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 24,
        backgroundColor: switchValue ? theme.colors.blue2 : theme.colors.blue2,
        borderRadius: 20,
        justifyContent: 'center',
        paddingHorizontal: 2,
        alignItems: switchValue ? 'flex-end' : 'flex-start',
      }}
      onPress={() =>
        comVal !== "USD" ? handleCurrency("USD") : handleCurrency("ZWL")
      }
    >
      <View
        style={{
          width: 20,
          height: 20,
          backgroundColor: theme.colors.white,
          borderRadius: 10,
        }}
      />
    </TouchableOpacity>
  );
};

export default SwitchButton;
